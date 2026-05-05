# frozen_string_literal: true

require "json"
require "time"

module Howlongtobeat
  class CacheService
    CACHE_PATH = Rails.root.join("tmp", "cache", "hltb_global_cache.json").to_s
    TTL        = 60 * 60 * 24 # 1 dia em segundos

    def self.get(game_name)
      cache = load_cache
      entry = cache[game_name]
      return nil unless entry

      cached_at = Time.parse(entry["cached_at"])
      return nil if Time.now - cached_at > TTL

      entry["data"]
    end

    def self.set(game_name, data)
      cache = load_cache
      cache[game_name] = {
        "cached_at" => Time.now.iso8601,
        "data"      => data
      }
      save_cache(cache)
    end

    private

    def self.load_cache
      return {} unless File.exist?(CACHE_PATH)
      JSON.parse(File.read(CACHE_PATH))
    rescue JSON::ParserError
      {}
    end

    def self.save_cache(cache)
      FileUtils.mkdir_p(File.dirname(CACHE_PATH))
      File.write(CACHE_PATH, JSON.pretty_generate(cache))
    end
  end
end
