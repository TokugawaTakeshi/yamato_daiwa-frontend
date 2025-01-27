namespace YamatoDaiwa.Frontend.Exceptions;


public class CustomYDF_DecorativeVariationIsNotEnumerationException : ArgumentException
{
  public CustomYDF_DecorativeVariationIsNotEnumerationException() : base(
    message: "The custom decorative variations must the be defined with enumeration."
  ) {}
}
