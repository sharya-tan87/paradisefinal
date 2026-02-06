#!/bin/bash

echo "==================================="
echo "RBAC Testing - All User Roles"
echo "==================================="

BASE_URL="http://localhost:3001"

# Test Manager
echo ""
echo "1. Testing MANAGER"
echo "-----------------------------------"
MANAGER_RESPONSE=$(curl -s -X POST "${BASE_URL}/api/auth/login" -H "Content-Type: application/json" -d '{"username":"manager","password":"antimize"}')
MANAGER_TOKEN=$(echo $MANAGER_RESPONSE | grep -o '"accessToken":"[^"]*' | cut -d'"' -f4)

if [ -n "$MANAGER_TOKEN" ]; then
    echo "✓ Manager logged in successfully"

    echo -n "  - /api/test/admin-only (expect 403): "
    STATUS=$(curl -s -w "%{http_code}" -o /dev/null -H "Authorization: Bearer $MANAGER_TOKEN" "${BASE_URL}/api/test/admin-only")
    if [ "$STATUS" = "403" ]; then echo "✓ $STATUS"; else echo "✗ $STATUS"; fi

    echo -n "  - /api/test/staff-only (expect 200): "
    STATUS=$(curl -s -w "%{http_code}" -o /dev/null -H "Authorization: Bearer $MANAGER_TOKEN" "${BASE_URL}/api/test/staff-only")
    if [ "$STATUS" = "200" ]; then echo "✓ $STATUS"; else echo "✗ $STATUS"; fi

    echo -n "  - /api/appointments (expect 200): "
    STATUS=$(curl -s -w "%{http_code}" -o /dev/null -H "Authorization: Bearer $MANAGER_TOKEN" "${BASE_URL}/api/appointments")
    if [ "$STATUS" = "200" ]; then echo "✓ $STATUS"; else echo "✗ $STATUS"; fi
else
    echo "✗ Manager login failed"
fi

# Test Dentist
echo ""
echo "2. Testing DENTIST"
echo "-----------------------------------"
DENTIST_RESPONSE=$(curl -s -X POST "${BASE_URL}/api/auth/login" -H "Content-Type: application/json" -d '{"username":"dentist","password":"antimize"}')
DENTIST_TOKEN=$(echo $DENTIST_RESPONSE | grep -o '"accessToken":"[^"]*' | cut -d'"' -f4)

if [ -n "$DENTIST_TOKEN" ]; then
    echo "✓ Dentist logged in successfully"

    echo -n "  - /api/test/admin-only (expect 403): "
    STATUS=$(curl -s -w "%{http_code}" -o /dev/null -H "Authorization: Bearer $DENTIST_TOKEN" "${BASE_URL}/api/test/admin-only")
    if [ "$STATUS" = "403" ]; then echo "✓ $STATUS"; else echo "✗ $STATUS"; fi

    echo -n "  - /api/test/staff-only (expect 200): "
    STATUS=$(curl -s -w "%{http_code}" -o /dev/null -H "Authorization: Bearer $DENTIST_TOKEN" "${BASE_URL}/api/test/staff-only")
    if [ "$STATUS" = "200" ]; then echo "✓ $STATUS"; else echo "✗ $STATUS"; fi
else
    echo "✗ Dentist login failed"
fi

# Test Staff
echo ""
echo "3. Testing STAFF"
echo "-----------------------------------"
STAFF_RESPONSE=$(curl -s -X POST "${BASE_URL}/api/auth/login" -H "Content-Type: application/json" -d '{"username":"staff","password":"antimize"}')
STAFF_TOKEN=$(echo $STAFF_RESPONSE | grep -o '"accessToken":"[^"]*' | cut -d'"' -f4)

if [ -n "$STAFF_TOKEN" ]; then
    echo "✓ Staff logged in successfully"

    echo -n "  - /api/test/admin-only (expect 403): "
    STATUS=$(curl -s -w "%{http_code}" -o /dev/null -H "Authorization: Bearer $STAFF_TOKEN" "${BASE_URL}/api/test/admin-only")
    if [ "$STATUS" = "403" ]; then echo "✓ $STATUS"; else echo "✗ $STATUS"; fi

    echo -n "  - /api/test/staff-only (expect 200): "
    STATUS=$(curl -s -w "%{http_code}" -o /dev/null -H "Authorization: Bearer $STAFF_TOKEN" "${BASE_URL}/api/test/staff-only")
    if [ "$STATUS" = "200" ]; then echo "✓ $STATUS"; else echo "✗ $STATUS"; fi

    echo -n "  - /api/appointments (expect 200): "
    STATUS=$(curl -s -w "%{http_code}" -o /dev/null -H "Authorization: Bearer $STAFF_TOKEN" "${BASE_URL}/api/appointments")
    if [ "$STATUS" = "200" ]; then echo "✓ $STATUS"; else echo "✗ $STATUS"; fi
else
    echo "✗ Staff login failed"
fi

# Test Patient
echo ""
echo "4. Testing PATIENT"
echo "-----------------------------------"
PATIENT_RESPONSE=$(curl -s -X POST "${BASE_URL}/api/auth/login" -H "Content-Type: application/json" -d '{"username":"patient","password":"antimize"}')
PATIENT_TOKEN=$(echo $PATIENT_RESPONSE | grep -o '"accessToken":"[^"]*' | cut -d'"' -f4)

if [ -n "$PATIENT_TOKEN" ]; then
    echo "✓ Patient logged in successfully"

    echo -n "  - /api/test/admin-only (expect 403): "
    STATUS=$(curl -s -w "%{http_code}" -o /dev/null -H "Authorization: Bearer $PATIENT_TOKEN" "${BASE_URL}/api/test/admin-only")
    if [ "$STATUS" = "403" ]; then echo "✓ $STATUS"; else echo "✗ $STATUS"; fi

    echo -n "  - /api/test/staff-only (expect 403): "
    STATUS=$(curl -s -w "%{http_code}" -o /dev/null -H "Authorization: Bearer $PATIENT_TOKEN" "${BASE_URL}/api/test/staff-only")
    if [ "$STATUS" = "403" ]; then echo "✓ $STATUS"; else echo "✗ $STATUS"; fi

    echo -n "  - /api/appointments (expect 403): "
    STATUS=$(curl -s -w "%{http_code}" -o /dev/null -H "Authorization: Bearer $PATIENT_TOKEN" "${BASE_URL}/api/appointments")
    if [ "$STATUS" = "403" ]; then echo "✓ $STATUS"; else echo "✗ $STATUS"; fi
else
    echo "✗ Patient login failed"
fi

# Test Admin (for hierarchy verification)
echo ""
echo "5. Testing ADMIN (hierarchy verification)"
echo "-----------------------------------"
ADMIN_RESPONSE=$(curl -s -X POST "${BASE_URL}/api/auth/login" -H "Content-Type: application/json" -d '{"username":"admin","password":"antimize"}')
ADMIN_TOKEN=$(echo $ADMIN_RESPONSE | grep -o '"accessToken":"[^"]*' | cut -d'"' -f4)

if [ -n "$ADMIN_TOKEN" ]; then
    echo "✓ Admin logged in successfully"

    echo -n "  - /api/test/admin-only (expect 200): "
    STATUS=$(curl -s -w "%{http_code}" -o /dev/null -H "Authorization: Bearer $ADMIN_TOKEN" "${BASE_URL}/api/test/admin-only")
    if [ "$STATUS" = "200" ]; then echo "✓ $STATUS"; else echo "✗ $STATUS"; fi

    echo -n "  - /api/test/staff-only (expect 200 via hierarchy): "
    STATUS=$(curl -s -w "%{http_code}" -o /dev/null -H "Authorization: Bearer $ADMIN_TOKEN" "${BASE_URL}/api/test/staff-only")
    if [ "$STATUS" = "200" ]; then echo "✓ $STATUS"; else echo "✗ $STATUS"; fi

    echo -n "  - /api/appointments (expect 200): "
    STATUS=$(curl -s -w "%{http_code}" -o /dev/null -H "Authorization: Bearer $ADMIN_TOKEN" "${BASE_URL}/api/appointments")
    if [ "$STATUS" = "200" ]; then echo "✓ $STATUS"; else echo "✗ $STATUS"; fi
else
    echo "✗ Admin login failed"
fi

echo ""
echo "==================================="
echo "RBAC Testing Complete"
echo "==================================="
