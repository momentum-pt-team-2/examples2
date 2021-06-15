require "minitest"
require 'minitest/autorun'

require_relative "./money"

class MoneyTest < Minitest::Test
  def test_can_add_money
    one_dollar = Money.new(1, "USD")
    two_dollar = Money.new(2, "USD")

    sum = one_dollar.plus(two_dollar)
    assert sum.amount == 3
  end

  def test_cannot_add_different_currency_codes
    one_dollar = Money.new(1, "USD")
    two_euro = Money.new(2, "EUR")

    assert_raises RuntimeError do
      sum = one_dollar.plus(two_euro)
    end
  end
end
