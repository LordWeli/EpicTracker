class ApplicationController < ActionController::Base
  # Apenas segurança básica e CSRF, se necessário
  protect_from_forgery with: :exception
end
