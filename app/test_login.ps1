# Test script for the Login API
$baseUrl = "http://localhost:8080/api/auth/login"

# Change these to match an account you actually registered
$loginPayload = @{
    username = "studenttest_1"
    password = "StrongPassword1"
} | ConvertTo-Json

Write-Host "================================="
Write-Host "Testing Login API"
Write-Host "URL: $baseUrl"
Write-Host "Sending Payload: $loginPayload"
Write-Host "================================="

try {
    $response = Invoke-RestMethod -Uri $baseUrl -Method Post -Headers @{"Content-Type"="application/json"} -Body $loginPayload
    
    Write-Host "`n[SUCCESS] Login Request Passed!" -ForegroundColor Green
    Write-Host "Response Body:"
    $response | ConvertTo-Json | Write-Host -ForegroundColor Cyan
}
catch {
    Write-Host "`n[ERROR] Login Request Failed!" -ForegroundColor Red
    
    if ($_.Exception.Response) {
        $errorStream = $_.Exception.Response.GetResponseStream()
        $reader = New-Object System.IO.StreamReader($errorStream)
        $errorBody = $reader.ReadToEnd()
        Write-Host "HTTP Status: $($_.Exception.Response.StatusCode)"
        Write-Host "Error Details: $errorBody" -ForegroundColor DarkRed
    } else {
        Write-Host $_.Exception.Message -ForegroundColor DarkRed
    }
}
