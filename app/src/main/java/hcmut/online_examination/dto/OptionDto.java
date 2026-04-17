package hcmut.online_examination.dto;

public record OptionDto(
        Long id,
        String content,
        Boolean isCorrect
) {
    public OptionDto {
        if (isCorrect == null) {
            isCorrect = false;
        }
    }
}
