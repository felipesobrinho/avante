import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import { useCustomersStore } from "@/stores/useCustomerStore";
import { CreateCustomerModal } from "./create-customer-modal";

const mockAddCustomer = jest.fn();

jest.mock("@/stores/useCustomerStore", () => ({
    useCustomersStore: () => ({
        addCustomer: mockAddCustomer,
    })
}))

describe("CreateCustomerModal", () => {

    it("render modal trigger", () => {
        render(<CreateCustomerModal />)
        expect(screen.getByText("Novo Cliente")).toBeInTheDocument();
    })

    it("open modal when triggered", () => {
        render(<CreateCustomerModal />)
        fireEvent.click(screen.getByText("Novo Cliente"))
        const submitButton = screen.getByRole("button", {name: "Cadastrar Cliente"})
        expect(submitButton).toBeInTheDocument();
    })
    
    it("submit valid data and register a new customer", async () => {
        render(<CreateCustomerModal />)
        fireEvent.click(screen.getByText("Novo Cliente"))
        fireEvent.change(screen.getByPlaceholderText("Cliente"), { target: {value: "Cliente 1"} } )
        fireEvent.change(screen.getByPlaceholderText("Endereço"), { target: {value: "Rua Alamedas"} } )
        fireEvent.change(screen.getByPlaceholderText("Telefone"), { target: {value: "3198768929"} } )
        const submitButton = screen.getByRole("button", {name: "Cadastrar Cliente"})
        fireEvent.click(submitButton)

        await waitFor(() => {
            expect(mockAddCustomer).toHaveBeenCalledWith(expect.objectContaining({
                name: "Cliente 1",
                address: "Rua Alamedas",
                phone: "3198768929"
            }))  
        })
    })
})