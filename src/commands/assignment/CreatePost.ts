import { Command, GuildStorage } from 'yamdbf';
import { GuildMember, Message, RichEmbed, TextChannel, User } from 'discord.js';
import Constants from '../../util/Constants';

export default class CreatePost extends Command {
	public constructor() {
		super({
			name: 'create',
			desc: 'Create Role Reaction Post',
			usage: '<prefix>create <Argument>',
			info: 'Creates message that users will react to in order to assign roles. ' +
			'Argument information below...\n\n' +
			'platform    : Creates platform assignment post.\n' +
			'spoiler     : Creates spoiler channel access post\n' +
			'faction     : Creates faction wars post\n' +
			'bungienews  : Creates Bungie News opt-in\n' +
			'servernews  : Creates Server News opt-in\n',
			group: 'assignment',
			guildOnly: true,
			callerPermissions: ['MANAGE_MESSAGES']
		});
	}

	public async action(message: Message, args: string[]): Promise<any> {
		if (!(<TextChannel> message.channel).permissionsFor(message.author).has('SEND_MESSAGES'))
			return message.author.send(`I can't create messages in that channel.`);

		const embed: RichEmbed = new RichEmbed();
		let guildStorage: GuildStorage = this.client.storage.guilds.get(message.guild.id);

		switch (args[0]) {
			case 'platform': {
					embed.setColor(Constants.embedColor);
					embed.setTitle(`Role Assignment`);
					embed.setDescription(`React/click the emoji with each of the platforms you will be playing Destiny on by clicking on the corresponding platform icon below.`);

					const reactionMessage: Message = <Message> await message.channel.send({ embed });

					await reactionMessage.react(Constants.blizzEmjoi.replace('<', '').replace('>', ''));
					await reactionMessage.react(Constants.psEmoji.replace('<', '').replace('>', ''));
					await reactionMessage.react(Constants.xbEmoji.replace('<', '').replace('>', ''));

					guildStorage.set('Role Reaction Message', reactionMessage.id.toString());
					break;
				}

			case 'spoiler': {
					embed.setColor(Constants.embedColor);
					embed.setTitle(`Spoilers Enabled Access`);
					embed.setDescription(`React/click the emoji below to enable access to the Destiny 2 Spoilers Channel.`);

					const reactionMessage: Message = <Message> await message.channel.send({ embed });

					await reactionMessage.react(Constants.D2Emoji.replace('<', '').replace('>', ''));

					guildStorage.set('Spoiler Reaction Message', reactionMessage.id.toString());
					break;
				}

			case 'faction': {
					embed.setColor(Constants.embedColor);
					embed.setTitle(`Which is the best faction?`);
					embed.setDescription(`React/click the emoji below to get the role and represent your favorite faction. Like in Destiny, you can only pledge to One (1) faction at a time.`);

					const reactionMessage: Message = <Message> await message.channel.send({ embed });

					await reactionMessage.react(Constants.DOEmoji.replace('<', '').replace('>', ''));
					await reactionMessage.react(Constants.FWCEmoji.replace('<', '').replace('>', ''));
					await reactionMessage.react(Constants.NMEmoji.replace('<', '').replace('>', ''));

					guildStorage.set('Faction Reaction Message', reactionMessage.id.toString());
					break;
				}

			case 'bungienews': {
					embed.setColor(Constants.embedColor);
					embed.setTitle(`Want to get notified for any Bungie News?`);
					embed.setDescription(`React/click the emoji below to **opt-in** to recieving pings for important Bungie News.`);

					const reactionMessage: Message = <Message> await message.channel.send({ embed });

					await reactionMessage.react(Constants.checkmark);

					guildStorage.set('BungieNews Reaction Message', reactionMessage.id.toString());
					break;
				}

			case 'servernews': {
					embed.setColor(Constants.embedColor);
					embed.setTitle(`Want to get notified for any Discord Server News?`);
					embed.setDescription(`React/click the emoji below to **opt-in** to recieving pings for important news regarding this Discord Server.`);

					const reactionMessage: Message = <Message> await message.channel.send({ embed });

					await reactionMessage.react(Constants.checkmark);

					guildStorage.set('ServerNews Reaction Message', reactionMessage.id.toString());
					break;
				}
		}
	}
}
