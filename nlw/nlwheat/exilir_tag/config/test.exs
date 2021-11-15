import Config

# Configure your database
#
# The MIX_TEST_PARTITION environment variable can be used
# to provide built-in test partitioning in CI environment.
# Run `mix help test` for more information.
config :exilir_tag, ExilirTag.Repo,
  username: "postgres",
  password: "postgres",
  database: "exilir_tag_test#{System.get_env("MIX_TEST_PARTITION")}",
  hostname: "localhost",
  pool: Ecto.Adapters.SQL.Sandbox,
  pool_size: 10

# We don't run a server during test. If one is required,
# you can enable the server option below.
config :exilir_tag, ExilirTagWeb.Endpoint,
  http: [ip: {127, 0, 0, 1}, port: 4002],
  secret_key_base: "u31OGUPSRHtb6cY+uG8m3G7/9Q2rKcAP0bd2H05ShdCDRyGuWM4JM8ETuOr5uXq2",
  server: false

# In test we don't send emails.
config :exilir_tag, ExilirTag.Mailer, adapter: Swoosh.Adapters.Test

# Print only warnings and errors during test
config :logger, level: :warn

# Initialize plugs at runtime for faster test compilation
config :phoenix, :plug_init_mode, :runtime
