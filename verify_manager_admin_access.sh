#!/bin/bash
BASE_URL="http://localhost:3001"
echo "Testing Manager Access to Admin Users Endpoint"

# Login as manager
RESPONSE=$(curl -s -X POST "${BASE_URL}/api/auth/login" -H "Content-Type: application/json" -d '{"username":"manager","password":"antimize"}')
TOKEN=$(echo $RESPONSE | grep -o '"accessToken":"[^"]*' | cut -d'"' -f4)

if [ -n "$TOKEN" ]; then
    echo "Manager Token acquired."
    # Test GET /api/admin/users
    echo -n "GET /api/admin/users (expect 200): "
    STATUS=$(curl -s -w "%{http_code}" -o /dev/null -H "Authorization: Bearer $TOKEN" "${BASE_URL}/api/admin/users")
    if [ "$STATUS" = "200" ]; then echo "PASS ($STATUS)"; else echo "FAIL ($STATUS)"; fi
else
    echo "Login failed."
    exit 1
fi
