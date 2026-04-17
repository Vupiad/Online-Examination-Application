package hcmut.online_examination.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class DashboardStats {
    private long openExamsCount;
    private long studentsTestingCount;
    private double completionRateToday;
}
