package com.louisplace.backend.features.code_piece;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

import java.util.List;
import java.util.Optional;
import org.junit.jupiter.api.*;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

@ExtendWith(MockitoExtension.class)
@DisplayName("CodePieceService Tests")
public class CodePieceServiceTest {

    @Mock
    private ICodePieceRepository codePieceRepository;

    @InjectMocks
    private CodePieceService codePieceService;

    static String email = "test@example.com";
    static CodePieceEntity mockEntity;

    @BeforeEach
    void beforeEach() {
        mockEntity = new CodePieceEntity();
        mockEntity.setUserEmail(email);
        mockEntity.setCode("console.log('test')");
        mockEntity.setLanguage("javascript");
        mockEntity.setTitle("Test Code");
        mockEntity.setIsSolved(false);

        lenient().when(codePieceRepository.save(any(CodePieceEntity.class)))
                .thenAnswer(invocation -> invocation.getArgument(0));

        lenient().when(codePieceRepository.findByUserEmail(email))
                .thenReturn(List.of(mockEntity));

        lenient().when(codePieceRepository.findByIdAndUserEmail(1L, email))
                .thenReturn(Optional.of(mockEntity));
    }

    @Nested
    @DisplayName("getUserCodePieces Tests")
    class GetUserCodePiecesTests {
        @Test
        @DisplayName("Should retrieve all code pieces for user")
        void shouldRetrieveUserCodePieces() {
            List<CodePieceEntity> pieces = codePieceService.getUserCodePieces(email);

            assertNotNull(pieces);
            assertEquals(1, pieces.size());
            assertEquals("Test Code", pieces.get(0).getTitle());
        }

        @Test
        @DisplayName("Should return empty list when user has no code pieces")
        void shouldReturnEmptyListWhenNoCodePieces() {
            when(codePieceRepository.findByUserEmail("empty@example.com"))
                    .thenReturn(List.of());

            List<CodePieceEntity> pieces = codePieceService.getUserCodePieces("empty@example.com");

            assertNotNull(pieces);
            assertTrue(pieces.isEmpty());
        }
    }

    @Nested
    @DisplayName("createCodePiece Tests")
    class CreateCodePieceTests {
        @Test
        @DisplayName("Should successfully create code piece with all fields")
        void shouldCreateCodePiece() {
            CodePieceCreateDTO dto = new CodePieceCreateDTO(
                "const x = 1;",
                "javascript",
                "My Code",
                "my-post",
                "Exercise 1",
                "const x = 2;"
            );

            Optional<CodePieceEntity> result = codePieceService.createCodePiece(email, dto);

            assertTrue(result.isPresent());
            assertEquals("My Code", result.get().getTitle());
            assertEquals(email, result.get().getUserEmail());
            assertEquals("javascript", result.get().getLanguage());
            assertEquals("const x = 1;", result.get().getCode());
            assertEquals("my-post", result.get().getSourcePostSlug());
            assertEquals("Exercise 1", result.get().getExerciseContext());
            assertEquals("const x = 2;", result.get().getSolutionCode());
            assertFalse(result.get().getIsSolved());
        }

        @Test
        @DisplayName("Should create code piece with minimal fields")
        void shouldCreateCodePieceWithMinimalFields() {
            CodePieceCreateDTO dto = new CodePieceCreateDTO(
                "console.log('test');",
                "javascript",
                "Quick Test",
                null,
                null,
                null
            );

            Optional<CodePieceEntity> result = codePieceService.createCodePiece(email, dto);

            assertTrue(result.isPresent());
            assertEquals("Quick Test", result.get().getTitle());
            assertNull(result.get().getSourcePostSlug());
            assertNull(result.get().getExerciseContext());
            assertNull(result.get().getSolutionCode());
        }

        @Test
        @DisplayName("Should set userEmail from session")
        void shouldSetUserEmailFromSession() {
            CodePieceCreateDTO dto = new CodePieceCreateDTO(
                "code",
                "python",
                "Python Code",
                null,
                null,
                null
            );

            codePieceService.createCodePiece(email, dto);

            verify(codePieceRepository, times(1)).save(argThat(entity ->
                    entity.getUserEmail().equals(email)
            ));
        }
    }

    @Nested
    @DisplayName("updateCodePiece Tests")
    class UpdateCodePieceTests {
        @Test
        @DisplayName("Should successfully update all fields")
        void shouldUpdateCodePiece() {
            CodePieceUpdateDTO dto = new CodePieceUpdateDTO(
                Optional.of("updated code"),
                Optional.of("Updated Title"),
                Optional.of(true)
            );

            Optional<CodePieceEntity> result = codePieceService.updateCodePiece(email, 1L, dto);

            assertTrue(result.isPresent());
            assertEquals("Updated Title", result.get().getTitle());
            assertEquals("updated code", result.get().getCode());
            assertTrue(result.get().getIsSolved());
        }

        @Test
        @DisplayName("Should handle partial updates (only code)")
        void shouldHandlePartialUpdateCode() {
            CodePieceUpdateDTO dto = new CodePieceUpdateDTO(
                Optional.of("new code"),
                Optional.empty(),
                Optional.empty()
            );

            codePieceService.updateCodePiece(email, 1L, dto);

            // Original mockEntity is updated
            assertEquals("new code", mockEntity.getCode());
        }

        @Test
        @DisplayName("Should handle partial updates (only title)")
        void shouldHandlePartialUpdateTitle() {
            CodePieceUpdateDTO dto = new CodePieceUpdateDTO(
                Optional.empty(),
                Optional.of("New Title"),
                Optional.empty()
            );

            codePieceService.updateCodePiece(email, 1L, dto);

            assertEquals("New Title", mockEntity.getTitle());
        }

        @Test
        @DisplayName("Should handle partial updates (only solved status)")
        void shouldHandlePartialUpdateSolvedStatus() {
            CodePieceUpdateDTO dto = new CodePieceUpdateDTO(
                Optional.empty(),
                Optional.empty(),
                Optional.of(true)
            );

            codePieceService.updateCodePiece(email, 1L, dto);

            assertTrue(mockEntity.getIsSolved());
        }

        @Test
        @DisplayName("Should return empty for non-existent code piece")
        void shouldReturnEmptyForNonExistent() {
            when(codePieceRepository.findByIdAndUserEmail(999L, email))
                    .thenReturn(Optional.empty());

            CodePieceUpdateDTO dto = new CodePieceUpdateDTO(
                Optional.of("code"),
                Optional.empty(),
                Optional.empty()
            );

            Optional<CodePieceEntity> result = codePieceService.updateCodePiece(email, 999L, dto);

            assertTrue(result.isEmpty());
        }

        @Test
        @DisplayName("Should verify ownership when updating")
        void shouldVerifyOwnershipWhenUpdating() {
            when(codePieceRepository.findByIdAndUserEmail(1L, "other@example.com"))
                    .thenReturn(Optional.empty());

            CodePieceUpdateDTO dto = new CodePieceUpdateDTO(
                Optional.of("code"),
                Optional.empty(),
                Optional.empty()
            );

            Optional<CodePieceEntity> result = codePieceService.updateCodePiece("other@example.com", 1L, dto);

            assertTrue(result.isEmpty());
        }
    }

    @Nested
    @DisplayName("deleteCodePiece Tests")
    class DeleteCodePieceTests {
        @Test
        @DisplayName("Should successfully delete code piece")
        void shouldDeleteCodePiece() {
            boolean result = codePieceService.deleteCodePiece(email, 1L);

            assertTrue(result);
            verify(codePieceRepository, times(1)).delete(any(CodePieceEntity.class));
        }

        @Test
        @DisplayName("Should return false for non-existent code piece")
        void shouldReturnFalseForNonExistent() {
            when(codePieceRepository.findByIdAndUserEmail(999L, email))
                    .thenReturn(Optional.empty());

            boolean result = codePieceService.deleteCodePiece(email, 999L);

            assertFalse(result);
            verify(codePieceRepository, never()).delete(any(CodePieceEntity.class));
        }

        @Test
        @DisplayName("Should verify ownership before deleting")
        void shouldVerifyOwnershipBeforeDeleting() {
            when(codePieceRepository.findByIdAndUserEmail(1L, "other@example.com"))
                    .thenReturn(Optional.empty());

            boolean result = codePieceService.deleteCodePiece("other@example.com", 1L);

            assertFalse(result);
            verify(codePieceRepository, never()).delete(any(CodePieceEntity.class));
        }

        @Test
        @DisplayName("Should delete the correct code piece")
        void shouldDeleteCorrectCodePiece() {
            codePieceService.deleteCodePiece(email, 1L);

            verify(codePieceRepository, times(1)).delete(mockEntity);
        }
    }
}
