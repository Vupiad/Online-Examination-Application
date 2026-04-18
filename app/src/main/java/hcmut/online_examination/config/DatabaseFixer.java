package hcmut.online_examination.config;

import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class DatabaseFixer implements CommandLineRunner {

    private final JdbcTemplate jdbcTemplate;

    @Override
    public void run(String... args) throws Exception {
        System.out.println("--- DRIVING DATABASE SCHEMA FIX ---");
        try {
            jdbcTemplate.execute("ALTER TABLE questions ALTER COLUMN content TYPE TEXT");
            System.out.println("Modified questions.content to TEXT");
        } catch (Exception e) {
            System.out.println("Note: Could not modify questions table (maybe already TEXT or table missing): " + e.getMessage());
        }

        try {
            jdbcTemplate.execute("ALTER TABLE options ALTER COLUMN content TYPE TEXT");
            System.out.println("Modified options.content to TEXT");
        } catch (Exception e) {
            System.out.println("Note: Could not modify options table: " + e.getMessage());
        }
        System.out.println("--- DATABASE SCHEMA FIX COMPLETED ---");
    }
}
