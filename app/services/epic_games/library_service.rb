# frozen_string_literal: true

require "open3"
require "json"

module EpicGames
  class LibraryService
    PYTHON_SCRIPT = Rails.root.join("lib", "python", "epic_games", "library.py").to_s
    PYTHON_BIN    = "python3"

    def initialize(auth_code:)
      @auth_code = auth_code
    end

    def call
      run_script("auth_code", @auth_code)
    end

    private

    def run_script(mode, value)
      stdout, stderr, status = Open3.capture3(PYTHON_BIN, PYTHON_SCRIPT, mode, value)

      unless status.success?
        return { success: false, error: "Erro ao executar script Python: #{stderr.strip}" }
      end

      parsed = JSON.parse(stdout.strip, symbolize_names: true)

      if parsed[:error]
        return { success: false, error: parsed[:error] }
      end

      {
        success: true,
        library: parsed[:library]
      }
    rescue JSON::ParserError => e
      { success: false, error: "Retorno inválido do script Python: #{e.message}" }
    end
  end
end
