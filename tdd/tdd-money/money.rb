class Money
  attr_reader :amount, :currencyCode

  def initialize(amount, currencyCode)
    @amount = amount
    @currencyCode = currencyCode
  end

  def plus(other)
    if @currencyCode != other.currencyCode
      raise RuntimeError.new("Currency codes do not match")
    end
    Money.new(@amount + other.amount, @currencyCode)
  end
end
