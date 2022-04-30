# Initial setup
init:
	@make create-env
	npm clean-install
# Write a default environment file
create-env:
	@echo "$$ENV_DEFAULT" > ./.env

# Default .env file fields
define ENV_DEFAULT
REACT_APP_SUPABASE_URL=
REACT_APP_SUPABASE_ANON_KEY=
endef
export ENV_DEFAULT