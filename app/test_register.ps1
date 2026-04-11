$baseUrl = "http://localhost:8080/api/auth/register"

$registerPayload = @{
    username = "studenttest_3"
    fullName = "Test User 3"
    password = "StrongPassword3"
    role = "STUDENT"
} | ConvertTo-Json

try {
    $response = Invoke-RestMethod -Uri $baseUrl -Method Post -Headers @{"Content-Type"="application/json"} -Body $registerPayload
    Write-Host "Success!"
    $response | ConvertTo-Json | Write-Host
}
catch {
    Write-Host "HTTP Status: $($_.Exception.Response.StatusCode)"
    
    if ($_.Exception.Response) {
        $errorStream = $_.Exception.Response.GetResponseStream()
        $reader = New-Object System.IO.StreamReader($errorStream)
        $errorBody = $reader.ReadToEnd()
        Write-Host "Error Body: $errorBody"
    } else {
        Write-Host $_.Exception.Message
    }
}
