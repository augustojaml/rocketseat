defmodule ExilirTag.Messages.Create do
  alias ExilirTag.{Message, Repo}

  def call(params) do
    params
    |> Message.changeset()
    |> Repo.insert()
    |> handle_iserte()
  end

  defp handle_iserte({:ok, %Message{}} = result), do: result
  defp handle_iserte({:error, result}), do: {:error, %{result: result, status: :bad_request}}

end
