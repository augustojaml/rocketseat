defmodule  ExilirTagWeb.MessagesView do
  use ExilirTagWeb, :view
  def render("create.json", %{message: message}) do
    %{
      result: "Message created",
      message: message
    }
  end
end
