defmodule ExilirTag.Application do
  # See https://hexdocs.pm/elixir/Application.html
  # for more information on OTP Applications
  @moduledoc false

  use Application

  @impl true
  def start(_type, _args) do
    children = [
      # Start the Ecto repository
      ExilirTag.Repo,
      # Start the Telemetry supervisor
      ExilirTagWeb.Telemetry,
      # Start the PubSub system
      {Phoenix.PubSub, name: ExilirTag.PubSub},
      # Start the Endpoint (http/https)
      ExilirTagWeb.Endpoint,
      # Start a worker by calling: ExilirTag.Worker.start_link(arg)
      # {ExilirTag.Worker, arg}
      ExilirTag.Scheduler
    ]

    # See https://hexdocs.pm/elixir/Supervisor.html
    # for other strategies and supported options
    opts = [strategy: :one_for_one, name: ExilirTag.Supervisor]
    Supervisor.start_link(children, opts)
  end

  # Tell Phoenix to update the endpoint configuration
  # whenever the application is updated.
  @impl true
  def config_change(changed, _new, removed) do
    ExilirTagWeb.Endpoint.config_change(changed, removed)
    :ok
  end
end
