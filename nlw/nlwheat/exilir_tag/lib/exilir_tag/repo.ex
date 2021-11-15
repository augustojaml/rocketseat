defmodule ExilirTag.Repo do
  use Ecto.Repo,
    otp_app: :exilir_tag,
    adapter: Ecto.Adapters.Postgres
end
