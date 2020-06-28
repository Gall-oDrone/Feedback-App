# You can find your endpoint's secret in your webhook settings
endpoint_secret = 'whsec_wMBB5gncUvEUoUVKEaO5noKZimUxlPtj'

@app.route("/webhook", methods=['POST'])
def webhook():
  payload = request.get_data()
  sig_header = request.headers.get('STRIPE_SIGNATURE')
  event = None

  try:
    event = stripe.Webhook.construct_event(
      payload, sig_header, endpoint_secret
    )
  except ValueError as e:
    # invalid payload
    return "Invalid payload", 400
  except stripe.error.SignatureVerificationError as e:
    # invalid signature
    return "Invalid signature", 400

  event_dict = event.to_dict()
  if event_dict['type'] == "payment_intent.succeeded":
    intent = event_dict['data']['object']
    print "Succeeded: ", intent['id']
    # Fulfill the customer's purchase
  elif event_dict['type'] == "payment_intent.payment_failed":
    intent = event_dict['data']['object']
    error_message = intent['last_payment_error']['message'] if intent.get('last_payment_error') else None
    print "Failed: ", intent['id'], error_message
    # Notify the customer that payment failed

  return "OK", 200
