import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import QuantitySelector from "../../src/components/QuantitySelector";
import { Product } from "../../src/entities";
import { CartProvider } from "../../src/providers/CartProvider";

describe("QuantitySelector", () => {
  const renderComponent = () => {
    const product: Product = {
      id: 1,
      name: "Milk",
      price: 5,
      categoryId: 1,
    };

    render(
      <CartProvider>
        <QuantitySelector product={product} />
      </CartProvider>
    );

    return {
      getAddToCartButton: () =>
        screen.queryByRole("button", {
          name: /add to cart/i,
        }),
      getQuantityControls: () => ({
        quantity: screen.queryByRole("status"),
        decrementButton: screen.queryByRole("button", {
          name: "-",
        }),
        incrementButton: screen.queryByRole("button", {
          name: "+",
        }),
      }),
      user: userEvent.setup(),
    };
  };

  it("should render the Add to Cart button", () => {
    const { getAddToCartButton } = renderComponent();

    expect(getAddToCartButton()).toBeInTheDocument();
  });

  it("should add the product to the cart", async () => {
    const { getAddToCartButton, user, getQuantityControls } =
      renderComponent();

    await user.click(getAddToCartButton()!);

    const { quantity, incrementButton, decrementButton } =
      getQuantityControls();
    expect(quantity).toHaveTextContent("1");
    expect(decrementButton).toBeInTheDocument();
    expect(incrementButton).toBeInTheDocument();
    expect(getAddToCartButton()).not.toBeInTheDocument();
  });

  it("should increment the quantity", async () => {
    const { getAddToCartButton, user, getQuantityControls } =
      renderComponent();
    await user.click(getAddToCartButton()!);

    const { incrementButton, quantity } = getQuantityControls();
    await user.click(incrementButton!);

    expect(quantity).toHaveTextContent("2");
  });

  it("should decrement the quantity", async () => {
    const { getAddToCartButton, user, getQuantityControls } =
      renderComponent();
    await user.click(getAddToCartButton()!);
    const { incrementButton, decrementButton, quantity } =
      getQuantityControls();
    await user.click(incrementButton!);

    await user.click(decrementButton!);

    expect(quantity).toHaveTextContent("1");
  });

  it("should remove the product from the cart", async () => {
    const { getAddToCartButton, user, getQuantityControls } =
      renderComponent();
    await user.click(getAddToCartButton()!);
    const { incrementButton, decrementButton, quantity } =
      getQuantityControls();

    await user.click(decrementButton!);

    expect(quantity).not.toBeInTheDocument();
    expect(decrementButton).not.toBeInTheDocument();
    expect(incrementButton).not.toBeInTheDocument();
    expect(getAddToCartButton()).toBeInTheDocument();
  });
});
