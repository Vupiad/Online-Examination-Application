package hcmut.online_examination.controller;

import hcmut.online_examination.service.GeminiService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/ai")
@RequiredArgsConstructor
public class AiController {

    private final GeminiService geminiService;

    @PostMapping("/scan")
    public String scan(@RequestBody Map<String, String> request) {
        String base64Data = request.get("image");
        String mimeType = request.getOrDefault("mimeType", "image/jpeg");
        
        if (base64Data != null && base64Data.contains(",")) {
            base64Data = base64Data.split(",")[1];
        }
        return geminiService.scanMultipleChoice(base64Data, mimeType);
    }
}
