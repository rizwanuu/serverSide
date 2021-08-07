const stripe = require('stripe')('sk_test_BxjMMTnbQfZuhNtWDA8sE9PI006ZD0csbr');
const express = require('express');
const app = express();
var bodyParser = require('body-parser')
const urlencodedparser = bodyParser.urlencoded({ extended: false });
app.use(express.static('.'));

const YOUR_DOMAIN = 'http://18.188.246.104:3000/dashboard';


app.post('/create-checkout-session', urlencodedparser, async (req, res) => {
  console.log(req.body);
  const data = req.body;
  const session = await stripe.checkout.sessions.create({
    payment_method_types: [
      'card',
    ],
    line_items: [
      {
        'price_data': {
          'currency': 'usd',
          'recurring': {
            'interval': data.perMonth,
          },
          'unit_amount': Number(data.selectedDays),
          'product_data': {
            'name': data.typeName,
          },
        },
        'quantity': 1,
      },
    ],
    mode: 'subscription',
    success_url: `${YOUR_DOMAIN}`,
    cancel_url: `${YOUR_DOMAIN}`,
  });

  res.redirect(303, session.url)
});

app.listen(4242, () => console.log('Running on port 4242'));