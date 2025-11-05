import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { CreateCategoryModal } from "./create-category-modal";
import { useCategoriesStore } from "@/stores/useCategoriesStore";

const mockAddCategory = jest.fn();

jest.mock("@/stores/useCategoriesStore", () => ({
    useCategoriesStore: () => ({
        addCategory: mockAddCategory,
    }),
}));

beforeEach(() => {
    mockAddCategory.mockClear();
});

describe("CreateCategoryModal", () => {
    it("renders modal trigger button", () => {
        render(<CreateCategoryModal />);
        expect(screen.getByText("Nova Categoria")).toBeInTheDocument();
    })

    it("opens modal when trigger is clicked", () => {
        render(<CreateCategoryModal />);
        fireEvent.click(screen.getByText("Nova Categoria"));
        expect(screen.getByText("Cadastrar Categoria")).toBeInTheDocument();
    })

    it("should submit valid data", async () => {
        render(<CreateCategoryModal />);
        fireEvent.click(screen.getByText("Nova Categoria"));
        fireEvent.change(screen.getByRole("textbox"), { target: { value: "Gaxeta" } })
        fireEvent.click(screen.getByText("Cadastrar Categoria"))

        await waitFor(() => {
            expect(mockAddCategory).toHaveBeenCalledWith(expect.objectContaining({
                name: "Gaxeta",
            })
            );
        });
    })
})