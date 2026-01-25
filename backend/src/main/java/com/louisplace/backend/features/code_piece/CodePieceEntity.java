package com.louisplace.backend.features.code_piece;

import java.io.Serializable;
import java.time.LocalDateTime;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

@Entity(name = "code_pieces")
public class CodePieceEntity implements Serializable {

    @Getter
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Setter
    @Getter
    @Column(nullable = false, columnDefinition = "TEXT")
    private String code;

    @Setter
    @Getter
    @Column(nullable = false)
    private String language;

    @Setter
    @Getter
    @Column(nullable = false)
    private String title;

    @Setter
    @Getter
    @Column(name = "user_email", nullable = false)
    private String userEmail;

    @Setter
    @Getter
    @Column(name = "source_post_slug")
    private String sourcePostSlug;

    @Setter
    @Getter
    @Column(name = "exercise_context")
    private String exerciseContext;

    @Setter
    @Getter
    @Column(columnDefinition = "TEXT")
    private String solutionCode;

    @Setter
    @Getter
    @Column(name = "is_solved")
    private Boolean isSolved = false;

    @Getter
    @CreationTimestamp
    @Column(name = "created_at", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @Getter
    @UpdateTimestamp
    @Column(name = "updated_at", nullable = false)
    private LocalDateTime updatedAt;
}
