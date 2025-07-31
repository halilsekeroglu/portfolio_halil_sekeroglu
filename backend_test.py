#!/usr/bin/env python3
"""
Comprehensive Backend API Testing for Halil Sekeroglu Portfolio Website
Tests all endpoints including health checks, contact form, and portfolio data
"""

import requests
import json
import os
import sys
from datetime import datetime
from typing import Dict, Any

# Get backend URL from frontend environment
def get_backend_url():
    """Get backend URL from frontend .env file"""
    try:
        with open('/app/frontend/.env', 'r') as f:
            for line in f:
                if line.startswith('REACT_APP_BACKEND_URL='):
                    return line.split('=', 1)[1].strip()
    except Exception as e:
        print(f"Error reading frontend .env: {e}")
        return None

BACKEND_URL = get_backend_url()
if not BACKEND_URL:
    print("ERROR: Could not get REACT_APP_BACKEND_URL from frontend/.env")
    sys.exit(1)

API_BASE_URL = f"{BACKEND_URL}/api"

print(f"Testing backend API at: {API_BASE_URL}")

class APITester:
    def __init__(self):
        self.test_results = []
        self.total_tests = 0
        self.passed_tests = 0
        self.failed_tests = 0
        
    def log_test(self, test_name: str, success: bool, details: str = "", response_data: Any = None):
        """Log test result"""
        self.total_tests += 1
        if success:
            self.passed_tests += 1
            status = "✅ PASS"
        else:
            self.failed_tests += 1
            status = "❌ FAIL"
            
        result = {
            "test": test_name,
            "status": status,
            "details": details,
            "response_data": response_data,
            "timestamp": datetime.now().isoformat()
        }
        self.test_results.append(result)
        print(f"{status}: {test_name}")
        if details:
            print(f"   Details: {details}")
        if not success and response_data:
            print(f"   Response: {response_data}")
        print()

    def test_health_endpoints(self):
        """Test health check endpoints"""
        print("=== TESTING HEALTH CHECK ENDPOINTS ===")
        
        # Test GET /api/
        try:
            response = requests.get(f"{API_BASE_URL}/", timeout=10)
            if response.status_code == 200:
                data = response.json()
                if "message" in data and "status" in data:
                    self.log_test("GET /api/ - Basic API Status", True, 
                                f"Status: {response.status_code}, Message: {data.get('message')}")
                else:
                    self.log_test("GET /api/ - Basic API Status", False, 
                                "Missing required fields in response", data)
            else:
                self.log_test("GET /api/ - Basic API Status", False, 
                            f"Status: {response.status_code}", response.text)
        except Exception as e:
            self.log_test("GET /api/ - Basic API Status", False, f"Request failed: {str(e)}")

        # Test GET /api/health
        try:
            response = requests.get(f"{API_BASE_URL}/health", timeout=10)
            if response.status_code == 200:
                data = response.json()
                if "status" in data and data["status"] == "healthy":
                    self.log_test("GET /api/health - Health Check", True, 
                                f"Status: {response.status_code}, Health: {data.get('status')}")
                else:
                    self.log_test("GET /api/health - Health Check", False, 
                                "Health status not healthy", data)
            else:
                self.log_test("GET /api/health - Health Check", False, 
                            f"Status: {response.status_code}", response.text)
        except Exception as e:
            self.log_test("GET /api/health - Health Check", False, f"Request failed: {str(e)}")

    def test_contact_form_functionality(self):
        """Test contact form functionality"""
        print("=== TESTING CONTACT FORM FUNCTIONALITY ===")
        
        # Test POST /api/contact/ with valid data
        valid_contact_data = {
            "name": "Halil Sekeroglu",
            "email": "halil.sekeroglu@example.com",
            "subject": "Portfolio Website Inquiry - Testing Contact Form",
            "message": "This is a test message to verify the contact form functionality is working properly. The message contains sufficient content to meet validation requirements."
        }
        
        try:
            response = requests.post(f"{API_BASE_URL}/contact/", 
                                   json=valid_contact_data, 
                                   headers={"Content-Type": "application/json"},
                                   timeout=10)
            if response.status_code == 200:
                data = response.json()
                if "id" in data and "timestamp" in data:
                    self.contact_message_id = data["id"]  # Store for later tests
                    self.log_test("POST /api/contact/ - Valid Contact Form", True, 
                                f"Message created with ID: {data['id']}")
                else:
                    self.log_test("POST /api/contact/ - Valid Contact Form", False, 
                                "Missing required fields in response", data)
            else:
                self.log_test("POST /api/contact/ - Valid Contact Form", False, 
                            f"Status: {response.status_code}", response.text)
        except Exception as e:
            self.log_test("POST /api/contact/ - Valid Contact Form", False, f"Request failed: {str(e)}")

        # Test form validation with invalid email
        invalid_email_data = {
            "name": "Test User",
            "email": "invalid-email",
            "subject": "Test Subject",
            "message": "This is a test message with invalid email format."
        }
        
        try:
            response = requests.post(f"{API_BASE_URL}/contact/", 
                                   json=invalid_email_data, 
                                   headers={"Content-Type": "application/json"},
                                   timeout=10)
            if response.status_code == 422:  # Validation error expected
                self.log_test("POST /api/contact/ - Invalid Email Validation", True, 
                            "Correctly rejected invalid email format")
            else:
                self.log_test("POST /api/contact/ - Invalid Email Validation", False, 
                            f"Expected 422, got {response.status_code}", response.text)
        except Exception as e:
            self.log_test("POST /api/contact/ - Invalid Email Validation", False, f"Request failed: {str(e)}")

        # Test form validation with missing required fields
        missing_fields_data = {
            "name": "Test User",
            "email": "test@example.com"
            # Missing subject and message
        }
        
        try:
            response = requests.post(f"{API_BASE_URL}/contact/", 
                                   json=missing_fields_data, 
                                   headers={"Content-Type": "application/json"},
                                   timeout=10)
            if response.status_code == 422:  # Validation error expected
                self.log_test("POST /api/contact/ - Missing Fields Validation", True, 
                            "Correctly rejected missing required fields")
            else:
                self.log_test("POST /api/contact/ - Missing Fields Validation", False, 
                            f"Expected 422, got {response.status_code}", response.text)
        except Exception as e:
            self.log_test("POST /api/contact/ - Missing Fields Validation", False, f"Request failed: {str(e)}")

        # Test GET /api/contact/ to retrieve stored messages
        try:
            response = requests.get(f"{API_BASE_URL}/contact/", timeout=10)
            if response.status_code == 200:
                data = response.json()
                if isinstance(data, list):
                    self.log_test("GET /api/contact/ - Retrieve Messages", True, 
                                f"Retrieved {len(data)} contact messages")
                else:
                    self.log_test("GET /api/contact/ - Retrieve Messages", False, 
                                "Response is not a list", data)
            else:
                self.log_test("GET /api/contact/ - Retrieve Messages", False, 
                            f"Status: {response.status_code}", response.text)
        except Exception as e:
            self.log_test("GET /api/contact/ - Retrieve Messages", False, f"Request failed: {str(e)}")

    def test_portfolio_data_endpoints(self):
        """Test portfolio data endpoints"""
        print("=== TESTING PORTFOLIO DATA ENDPOINTS ===")
        
        # Test GET /api/portfolio/projects
        try:
            response = requests.get(f"{API_BASE_URL}/portfolio/projects", timeout=10)
            if response.status_code == 200:
                data = response.json()
                if isinstance(data, list):
                    self.log_test("GET /api/portfolio/projects - All Projects", True, 
                                f"Retrieved {len(data)} projects")
                    # Verify project structure
                    if data and len(data) > 0:
                        project = data[0]
                        required_fields = ["id", "title", "description", "technologies", "category"]
                        missing_fields = [field for field in required_fields if field not in project]
                        if not missing_fields:
                            self.log_test("Project Data Structure Validation", True, 
                                        "All required fields present in project data")
                        else:
                            self.log_test("Project Data Structure Validation", False, 
                                        f"Missing fields: {missing_fields}")
                else:
                    self.log_test("GET /api/portfolio/projects - All Projects", False, 
                                "Response is not a list", data)
            else:
                self.log_test("GET /api/portfolio/projects - All Projects", False, 
                            f"Status: {response.status_code}", response.text)
        except Exception as e:
            self.log_test("GET /api/portfolio/projects - All Projects", False, f"Request failed: {str(e)}")

        # Test GET /api/portfolio/experience
        try:
            response = requests.get(f"{API_BASE_URL}/portfolio/experience", timeout=10)
            if response.status_code == 200:
                data = response.json()
                if isinstance(data, list):
                    self.log_test("GET /api/portfolio/experience - Work Experience", True, 
                                f"Retrieved {len(data)} experience entries")
                    # Verify experience structure
                    if data and len(data) > 0:
                        experience = data[0]
                        required_fields = ["id", "company", "role", "period", "achievements"]
                        missing_fields = [field for field in required_fields if field not in experience]
                        if not missing_fields:
                            self.log_test("Experience Data Structure Validation", True, 
                                        "All required fields present in experience data")
                        else:
                            self.log_test("Experience Data Structure Validation", False, 
                                        f"Missing fields: {missing_fields}")
                else:
                    self.log_test("GET /api/portfolio/experience - Work Experience", False, 
                                "Response is not a list", data)
            else:
                self.log_test("GET /api/portfolio/experience - Work Experience", False, 
                            f"Status: {response.status_code}", response.text)
        except Exception as e:
            self.log_test("GET /api/portfolio/experience - Work Experience", False, f"Request failed: {str(e)}")

        # Test GET /api/portfolio/expertise
        try:
            response = requests.get(f"{API_BASE_URL}/portfolio/expertise", timeout=10)
            if response.status_code == 200:
                data = response.json()
                if isinstance(data, list):
                    self.log_test("GET /api/portfolio/expertise - Technical Expertise", True, 
                                f"Retrieved {len(data)} expertise areas")
                    # Verify expertise structure
                    if data and len(data) > 0:
                        expertise = data[0]
                        required_fields = ["id", "category", "title", "description", "experience_level"]
                        missing_fields = [field for field in required_fields if field not in expertise]
                        if not missing_fields:
                            self.log_test("Expertise Data Structure Validation", True, 
                                        "All required fields present in expertise data")
                        else:
                            self.log_test("Expertise Data Structure Validation", False, 
                                        f"Missing fields: {missing_fields}")
                else:
                    self.log_test("GET /api/portfolio/expertise - Technical Expertise", False, 
                                "Response is not a list", data)
            else:
                self.log_test("GET /api/portfolio/expertise - Technical Expertise", False, 
                            f"Status: {response.status_code}", response.text)
        except Exception as e:
            self.log_test("GET /api/portfolio/expertise - Technical Expertise", False, f"Request failed: {str(e)}")

        # Test GET /api/portfolio/stats
        try:
            response = requests.get(f"{API_BASE_URL}/portfolio/stats", timeout=10)
            if response.status_code == 200:
                data = response.json()
                if isinstance(data, dict):
                    required_stats = ["total_projects", "total_experience_entries", "total_expertise_areas"]
                    missing_stats = [stat for stat in required_stats if stat not in data]
                    if not missing_stats:
                        self.log_test("GET /api/portfolio/stats - Portfolio Statistics", True, 
                                    f"Stats: {data.get('total_projects')} projects, {data.get('total_experience_entries')} experiences")
                    else:
                        self.log_test("GET /api/portfolio/stats - Portfolio Statistics", False, 
                                    f"Missing stats: {missing_stats}")
                else:
                    self.log_test("GET /api/portfolio/stats - Portfolio Statistics", False, 
                                "Response is not a dictionary", data)
            else:
                self.log_test("GET /api/portfolio/stats - Portfolio Statistics", False, 
                            f"Status: {response.status_code}", response.text)
        except Exception as e:
            self.log_test("GET /api/portfolio/stats - Portfolio Statistics", False, f"Request failed: {str(e)}")

    def test_data_validation(self):
        """Test data validation and seeded data"""
        print("=== TESTING DATA VALIDATION ===")
        
        # Test that seeded data from Halil's background is correctly stored
        try:
            response = requests.get(f"{API_BASE_URL}/portfolio/projects", timeout=10)
            if response.status_code == 200:
                projects = response.json()
                
                # Look for specific projects from Halil's background
                telus_project = next((p for p in projects if "TELUS" in p.get("title", "")), None)
                burger_king_project = next((p for p in projects if "Burger King" in p.get("title", "")), None)
                
                if telus_project:
                    # Verify project details include client info, technologies, challenges, solutions
                    has_client = "client" in telus_project and telus_project["client"]
                    has_technologies = "technologies" in telus_project and len(telus_project["technologies"]) > 0
                    has_challenges = "challenges" in telus_project and len(telus_project.get("challenges", [])) > 0
                    has_solutions = "solutions" in telus_project and len(telus_project.get("solutions", [])) > 0
                    
                    if has_client and has_technologies and has_challenges and has_solutions:
                        self.log_test("TELUS Project Data Validation", True, 
                                    f"Complete project data with client: {telus_project['client']}")
                    else:
                        missing = []
                        if not has_client: missing.append("client")
                        if not has_technologies: missing.append("technologies")
                        if not has_challenges: missing.append("challenges")
                        if not has_solutions: missing.append("solutions")
                        self.log_test("TELUS Project Data Validation", False, 
                                    f"Missing project details: {missing}")
                else:
                    self.log_test("TELUS Project Data Validation", False, "TELUS project not found in seeded data")
                    
                if burger_king_project:
                    self.log_test("Burger King Project Data Validation", True, 
                                f"Found Burger King project: {burger_king_project['title']}")
                else:
                    self.log_test("Burger King Project Data Validation", False, "Burger King project not found")
                    
        except Exception as e:
            self.log_test("Project Data Validation", False, f"Request failed: {str(e)}")

        # Test experience data includes team leadership and detailed responsibilities
        try:
            response = requests.get(f"{API_BASE_URL}/portfolio/experience", timeout=10)
            if response.status_code == 200:
                experiences = response.json()
                
                # Look for Capgemini or Quantiphi experience
                capgemini_exp = next((e for e in experiences if "Capgemini" in e.get("company", "")), None)
                quantiphi_exp = next((e for e in experiences if "Quantiphi" in e.get("company", "")), None)
                
                leadership_found = False
                detailed_responsibilities_found = False
                
                for exp in experiences:
                    if exp.get("team_leadership"):
                        leadership_found = True
                    if exp.get("detailed_responsibilities") and len(exp["detailed_responsibilities"]) > 0:
                        detailed_responsibilities_found = True
                
                if leadership_found and detailed_responsibilities_found:
                    self.log_test("Experience Data Validation", True, 
                                "Experience includes team leadership and detailed responsibilities")
                else:
                    missing = []
                    if not leadership_found: missing.append("team_leadership")
                    if not detailed_responsibilities_found: missing.append("detailed_responsibilities")
                    self.log_test("Experience Data Validation", False, 
                                f"Missing experience details: {missing}")
                    
        except Exception as e:
            self.log_test("Experience Data Validation", False, f"Request failed: {str(e)}")

        # Test technical expertise shows proper experience levels and categories
        try:
            response = requests.get(f"{API_BASE_URL}/portfolio/expertise", timeout=10)
            if response.status_code == 200:
                expertise_list = response.json()
                
                expert_level_found = False
                categories_found = set()
                
                for expertise in expertise_list:
                    if expertise.get("experience_level") == "Expert":
                        expert_level_found = True
                    if expertise.get("category"):
                        categories_found.add(expertise["category"])
                
                if expert_level_found and len(categories_found) > 0:
                    self.log_test("Technical Expertise Validation", True, 
                                f"Found expert-level skills in {len(categories_found)} categories")
                else:
                    issues = []
                    if not expert_level_found: issues.append("no expert-level skills")
                    if len(categories_found) == 0: issues.append("no categories")
                    self.log_test("Technical Expertise Validation", False, 
                                f"Issues: {issues}")
                    
        except Exception as e:
            self.log_test("Technical Expertise Validation", False, f"Request failed: {str(e)}")

    def test_error_handling(self):
        """Test error handling"""
        print("=== TESTING ERROR HANDLING ===")
        
        # Test invalid endpoint returns 404
        try:
            response = requests.get(f"{API_BASE_URL}/invalid-endpoint", timeout=10)
            if response.status_code == 404:
                self.log_test("Invalid Endpoint - 404 Response", True, 
                            "Correctly returned 404 for invalid endpoint")
            else:
                self.log_test("Invalid Endpoint - 404 Response", False, 
                            f"Expected 404, got {response.status_code}")
        except Exception as e:
            self.log_test("Invalid Endpoint - 404 Response", False, f"Request failed: {str(e)}")

        # Test malformed request returns appropriate error
        try:
            response = requests.post(f"{API_BASE_URL}/contact/", 
                                   data="invalid json", 
                                   headers={"Content-Type": "application/json"},
                                   timeout=10)
            if response.status_code in [400, 422]:  # Bad request or validation error
                self.log_test("Malformed Request Handling", True, 
                            f"Correctly handled malformed request with status {response.status_code}")
            else:
                self.log_test("Malformed Request Handling", False, 
                            f"Expected 400/422, got {response.status_code}")
        except Exception as e:
            self.log_test("Malformed Request Handling", False, f"Request failed: {str(e)}")

        # Test CORS headers are present
        try:
            response = requests.get(f"{API_BASE_URL}/", 
                                  headers={"Origin": "http://localhost:3000"}, 
                                  timeout=10)
            cors_headers = {
                "Access-Control-Allow-Origin": response.headers.get("Access-Control-Allow-Origin"),
                "Access-Control-Allow-Credentials": response.headers.get("Access-Control-Allow-Credentials")
            }
            
            if cors_headers["Access-Control-Allow-Origin"]:
                self.log_test("CORS Headers Validation", True, 
                            f"CORS headers present: {cors_headers}")
            else:
                self.log_test("CORS Headers Validation", False, 
                            "No CORS headers found in response")
        except Exception as e:
            self.log_test("CORS Headers Validation", False, f"Request failed: {str(e)}")

    def run_all_tests(self):
        """Run all test suites"""
        print(f"Starting comprehensive backend API testing at {datetime.now()}")
        print(f"Backend URL: {API_BASE_URL}")
        print("=" * 80)
        
        self.test_health_endpoints()
        self.test_contact_form_functionality()
        self.test_portfolio_data_endpoints()
        self.test_data_validation()
        self.test_error_handling()
        
        self.print_summary()

    def print_summary(self):
        """Print test summary"""
        print("=" * 80)
        print("TEST SUMMARY")
        print("=" * 80)
        print(f"Total Tests: {self.total_tests}")
        print(f"Passed: {self.passed_tests}")
        print(f"Failed: {self.failed_tests}")
        print(f"Success Rate: {(self.passed_tests/self.total_tests*100):.1f}%")
        print()
        
        if self.failed_tests > 0:
            print("FAILED TESTS:")
            for result in self.test_results:
                if "❌" in result["status"]:
                    print(f"- {result['test']}: {result['details']}")
            print()
        
        print("DETAILED RESULTS:")
        for result in self.test_results:
            print(f"{result['status']}: {result['test']}")
            if result['details']:
                print(f"   {result['details']}")
        
        print("=" * 80)

if __name__ == "__main__":
    tester = APITester()
    tester.run_all_tests()