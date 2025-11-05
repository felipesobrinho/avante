import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { CreateProductModal } from "./create-product-modal";

const mockAddProduct = jest.fn();
const mockFetchCategories = jest.fn();

jest.mock("@/stores/useProductsStore", () => ({
  useProductsStore: () => ({
    addProduct: mockAddProduct,
  }),
}));

jest.mock("@/stores/useCategoriesStore", () => ({
  useCategoriesStore: () => ({
    categories: [
      { id: "cat1", name: "Categoria 1" },
      { id: "cat2", name: "Categoria 2" },
    ],
    fetchCategories: mockFetchCategories,
  }),
}));

beforeEach(() => {
  mockAddProduct.mockClear();
  mockFetchCategories.mockClear();
});

describe("CreateProductModal", () => {
  it("renders modal trigger button", () => {
    render(<CreateProductModal />);
    expect(screen.getByText("Novo Produto")).toBeInTheDocument();
  });

  it("opens modal when trigger is clicked", () => {
    render(<CreateProductModal />);
    fireEvent.click(screen.getByText("Novo Produto"));
    expect(screen.getByText("Criar Produto")).toBeInTheDocument();
  });

  // teste validação de campos obrigatórios
  // it("shows validation errors for required fields", async () => {
  //   render(<CreateProductModal />);
  //   fireEvent.click(screen.getByText("Novo Produto"));
  //   fireEvent.click(screen.getByText("Cadastrar Produto"));
  //   await waitFor(() => {
  //     expect(screen.getByText(/required/i)).toBeInTheDocument();
  //   });
  // });

  it("shows categories in select", async () => {
    render(<CreateProductModal />);
    fireEvent.click(screen.getByText("Novo Produto"));
    fireEvent.click(screen.getByText("Selecione uma categoria"));
    expect(screen.getAllByRole("option")).toHaveLength(2);
    expect(screen.getAllByRole("option")[0]).toHaveTextContent("Categoria 1");
    expect(screen.getAllByRole("option")[1]).toHaveTextContent("Categoria 2");
  });

  it("submits form with valid data (SOB_ENCOMENDA)", async () => {
    render(<CreateProductModal />);
    fireEvent.click(screen.getByText("Novo Produto"));
    fireEvent.change(screen.getByPlaceholderText("Nome do produto"), { target: { value: "Produto X" } });
    fireEvent.change(screen.getByPlaceholderText("Medida do produto"), { target: { value: "kg" } });

    fireEvent.click(screen.getByText("Selecione uma categoria"));
    fireEvent.click(screen.getByRole("option", { name: "Categoria 1" }));

    fireEvent.click(screen.getByText("Cadastrar Produto"));

    await waitFor(() => {
      expect(mockAddProduct).toHaveBeenCalledWith(expect.objectContaining({
        name: "Produto X",
        categoryId: "cat1",
        measure: "kg",
        productionType: "SOB_ENCOMENDA",
        stock: null,
      })
      );
    });
  });

  // testes quando "em estoque" é selecionado
  // it("shows price and stock fields when productionType is EM_ESTOQUE", async () => {
  //   render(<CreateProductModal />);

  //   fireEvent.click(screen.getByText("Novo Produto"));

  //   const productionSelect = screen.getAllByRole("combobox");
  //   fireEvent.click(productionSelect[0]);

  //   const emEstoqueOption = await screen.findByText("Em estoque");
  //   fireEvent.click(emEstoqueOption);

  //   const priceInput = await screen.findByLabelText("Preço");
  //   const stockInput = await screen.findAllByLabelText("Quantidade em estoque");

  //   expect(priceInput).toBeInTheDocument();
  //   expect(stockInput).toBeInTheDocument();
  // });

  // it("shows error if price is missing for EM_ESTOQUE", async () => {
  //   render(<CreateProductModal />);
  //   fireEvent.click(screen.getByText("Novo Produto"));
  //   const productionSelect = screen.getAllByRole("combobox");
  //     fireEvent.click(productionSelect[0]);
  //   fireEvent.click(screen.getByText("Em estoque"));
  //   fireEvent.change(screen.getByPlaceholderText("Nome do produto"), { target: { value: "Produto Y" } });
  //   fireEvent.change(screen.getByPlaceholderText("Medida do produto"), { target: { value: "kg" } });
  //   fireEvent.click(screen.getByText("Selecione uma categoria"));
  //   fireEvent.click(screen.getByRole("option", { name: "Categoria 1" }));
  //   fireEvent.click(screen.getByText("Cadastrar Produto"));
  //   await waitFor(() => {
  //     expect(screen.getByText("Invalid input: expected number, received NaN")).toBeInTheDocument();
  //   });
  // });

  // it("submits form with valid data (EM_ESTOQUE)", async () => {
  //   render(<CreateProductModal />);
  //   fireEvent.click(screen.getByText("Novo Produto"));
  //   const productionSelect = screen.getAllByRole("combobox");
  //     fireEvent.click(productionSelect[0]);
  //   fireEvent.click(screen.getByText("Em estoque"));
  //   fireEvent.change(screen.getByPlaceholderText("Nome do produto"), { target: { value: "Produto Z" } });
  //   fireEvent.change(screen.getByPlaceholderText("Medida do produto"), { target: { value: "g" } });
  //   fireEvent.change(screen.findByPlaceholderText("Preço do produto"), { target: { value: "10" } });
  //   fireEvent.change(screen.findByPlaceholderText("Quantidade em Estoque"), { target: { value: "5" } });
  //   fireEvent.click(screen.getByText("Selecione uma categoria"));
  //   fireEvent.click(screen.getByText("Categoria 1"));
  //   fireEvent.click(screen.getByText("Cadastrar Produto"));
  //   await waitFor(() => {
  //     expect(mockAddProduct).toHaveBeenCalledWith(
  //       expect.objectContaining({
  //         name: "Produto Z",
  //         categoryId: "cat1",
  //         measure: "g",
  //         price: 10,
  //         stock: 5,
  //         productionType: "EM_ESTOQUE",
  //       })
  //     );
  //   });
  // });

  it("calls fetchCategories on mount", () => {
    render(<CreateProductModal />);
    expect(mockFetchCategories).toHaveBeenCalled();
  });
});