package hcmut.online_examination.dto;

public record TestCaseDto(
        Long id,
        String input,
        String expectedOutput,
        boolean isHidden
) {
}
