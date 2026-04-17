// package hcmut.online_examination.controller;

// import hcmut.online_examination.dto.AuthResponse;
// import hcmut.online_examination.dto.LoginRequest;
// import hcmut.online_examination.dto.RegisterRequest;
// import hcmut.online_examination.dto.RegisterResponse;
// import hcmut.online_examination.service.AuthService;
// import jakarta.validation.Valid;
// import lombok.RequiredArgsConstructor;
// import org.springframework.http.HttpStatus;
// import org.springframework.http.ResponseEntity;
// import org.springframework.web.bind.annotation.CrossOrigin;
// import org.springframework.web.bind.annotation.PostMapping;
// import org.springframework.web.bind.annotation.RequestBody;
// import org.springframework.web.bind.annotation.RequestMapping;
// import org.springframework.web.bind.annotation.RestController;

// @RestController
// @RequestMapping("/api/auth")
// @RequiredArgsConstructor
// @CrossOrigin
// public class AuthController {

//     private final AuthService authService;

//     @PostMapping("/register")
//     public ResponseEntity<RegisterResponse> register(@Valid @RequestBody RegisterRequest request) {
//         RegisterResponse response = authService.register(request);
//         return ResponseEntity.status(HttpStatus.CREATED).body(response);
//     }

//     @PostMapping("/login")
//     public ResponseEntity<AuthResponse> login(@Valid @RequestBody LoginRequest request) {
//         return ResponseEntity.ok(authService.login(request));
//     }
// }
