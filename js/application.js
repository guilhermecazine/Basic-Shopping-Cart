var updateItemPrice = function (ele) {
  var pricePerUnit = parseFloat($(ele).children('.pricePerUnit').text());
  var quantity = parseFloat($(ele).find('.quantity input').val());

  var itemPrice = pricePerUnit * quantity;
  $(ele).children('.itemPrice').html(itemPrice);

  return itemPrice;
}

var sum = function (acc, x) {return acc + x; };

var updateTotal = function () {
  var totalShoppingCart = [];

  $('tbody tr').each(function (i, ele) {
    var itemPrice = updateItemPrice(ele);
    totalShoppingCart.push(itemPrice);
  });

  var total = totalShoppingCart.reduce(sum);
  $('#shoppingCartTotal').html(total);

}

$(document).ready(function () {
  updateTotal();

  $('.btn.remove').on('click', function (event) {
    $(this).closest('tr').remove();
    updateTotal();
  });

  var timeout;
  $('tbody').on('input', '.quantity input', function () {
    clearTimeout(timeout);
    timeout = setTimeout(function () {
      updateTotal();
    }, 100);
  });
  
  $('#addItem').on('submit', function (event) {
    event.preventDefault();
    var item = $(this).children('[name=item]').val();
    var pricePerUnit = $(this).children('[name=pricePerUnit]').val();
    var quantity = $(this).children('[name=quantity]').val();

    $('tbody').append('<tr>' +
    '<td class="item">' + item + '</td>' +
    '<td class="pricePerUnit">' + pricePerUnit + '</td>' +
    '<td class="quantity"><input type="number" value="' + quantity + '" /></td>' +
    
    '<td class="itemPrice"></td>' +
    
    '<td><button class="btn button-24 remove">Remove</button></td>' +
    '</tr>');

    updateTotal();
    $(this).children('[name=item]').val('');
    $(this).children('[name="pricePerUnit"]').val('');
    $(this).children('[name=quantity]').val('');
});

});