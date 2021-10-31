const url = `https://discord.com/api/v9/channels/${CHANNEL}/messages`

const message = async (token, target = undefined) => {
  const content = target === undefined ? 't!daily' : `t!rep ${target}`

  await fetch(url,
    {
      method: 'POST',
      headers:
      {
        'method': 'POST',
        'authorization': token,
        'content-type': 'application/json'
      },
      body: JSON.stringify({ content: content })
    })
}

const doTasks = async () => {

  for (const account of JSON.parse(DTOKENS)) {
    await message(account.token, account.rep_target)
    await message(account.token)
  };

  return new Response(null, { status: 204 })
}

addEventListener('scheduled', event => {
  event.waitUntil(doTasks())
})