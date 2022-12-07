import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import { RenderList } from ".";

import "@testing-library/jest-dom/extend-expect";

describe("RenderList", () => {
  it("should render list items", () => {
    render(
      <RenderList
        items={[
          {
            name: "Foo",
          },
          {
            name: "Bar",
          },
        ]}
        render={(item) => <div>{item.name}</div>}
      />
    );

    expect(screen.getByText("Foo")).toBeInTheDocument();
    expect(screen.getByText("Bar")).toBeInTheDocument();
  });

  it("should not render search input when items are small", () => {
    render(
      <RenderList
        items={[
          {
            name: "Foo",
          },
          {
            name: "Bar",
          },
        ]}
        render={(item) => <div>{item.name}</div>}
      />
    );

    expect(screen.queryByPlaceholderText("Search")).not.toBeInTheDocument();
  });

  it("should render search input when items are large", () => {
    render(
      <RenderList
        items={Array.from({ length: 11 }, (_, i) => ({ name: `foo${i}` }))}
        render={(item) => <div>{item.name}</div>}
      />
    );

    expect(screen.getByPlaceholderText("Search")).toBeInTheDocument();
  });

  it("should render not search input when items are large and list is declared `notSearchable`", () => {
    render(
      <RenderList
        items={Array.from({ length: 11 }, (_, i) => ({ name: `foo${i}` }))}
        notSearchable
        render={(item) => <div>{item.name}</div>}
      />
    );

    expect(screen.queryByPlaceholderText("Search")).not.toBeInTheDocument();
  });

  it("should search items when search input is keyed", () => {
    render(
      <RenderList
        items={Array.from({ length: 11 }, (_, i) => ({ name: `foo${i}` }))}
        render={(item) => <div>{item.name}</div>}
      />
    );

    expect(screen.getByText("foo0")).toBeInTheDocument();
    expect(screen.getByText("foo1")).toBeInTheDocument();

    fireEvent.change(screen.getByPlaceholderText("Search"), {
      target: { value: "foo1" },
    });

    expect(screen.queryByText("foo0")).not.toBeInTheDocument();
    expect(screen.getByText("foo1")).toBeInTheDocument();
    expect(screen.queryByText("No Search Results")).not.toBeInTheDocument();
  });

  it("should search items when search input is keyed", () => {
    render(
      <RenderList
        items={Array.from({ length: 11 }, (_, i) => ({ name: `foo${i}` }))}
        render={(item) => <div>{item.name}</div>}
      />
    );

    expect(screen.getByText("foo0")).toBeInTheDocument();
    expect(screen.getByText("foo1")).toBeInTheDocument();
    expect(screen.queryByText("No Search Results")).not.toBeInTheDocument();

    fireEvent.change(screen.getByPlaceholderText("Search"), {
      target: { value: "something to not exist" },
    });

    expect(screen.queryByText("foo0")).not.toBeInTheDocument();
    expect(screen.queryByText("foo1")).not.toBeInTheDocument();

    expect(screen.getByText("No Search Results")).toBeInTheDocument();
  });

  it("should render sorted list items when asked to", () => {
    render(
      <RenderList
        items={[
          {
            name: "Boo",
          },
          {
            name: "Zoo",
          },
          {
            name: "Aoo",
          },
        ]}
        sortByName
        render={(item, index) => <div>{`${index} - ${item.name}`}</div>}
      />
    );

    expect(screen.getByText("0 - Aoo")).toBeInTheDocument();
    expect(screen.getByText("1 - Boo")).toBeInTheDocument();
    expect(screen.getByText("2 - Zoo")).toBeInTheDocument();
  });

  it("should render skeleton when loading", () => {
    render(
      <RenderList
        items={[
          {
            name: "Foo",
          },
          {
            name: "Bar",
          },
        ]}
        isLoading={5}
        render={(item) => <div>{item.name}</div>}
      />
    );

    expect(screen.getByTestId("list-skeleton")).toBeInTheDocument();
    expect(screen.queryByText("Bar")).not.toBeInTheDocument();
  });

  it("should render error when present", () => {
    render(
      <RenderList
        items={[
          {
            name: "Foo",
          },
          {
            name: "Bar",
          },
        ]}
        error="Some nasty error"
        render={(item) => <div>{item.name}</div>}
      />
    );

    expect(screen.getByText("Some nasty error")).toBeInTheDocument();
    expect(screen.queryByText("Bar")).not.toBeInTheDocument();
  });

  it("should render Empty view when empty", () => {
    render(<RenderList items={[]} render={() => <div>foo</div>} />);

    expect(screen.getByText("No Item To Look At")).toBeInTheDocument();
  });

  it("should render Empty view and `add new item` when empty and there is a newItemLink", () => {
    render(
      <RenderList
        items={[]}
        newItemLink="/add/new"
        singular="Product"
        render={() => <div>foo</div>}
      />
    );

    expect(screen.getByText("No Product To Look At")).toBeInTheDocument();
  });
});
