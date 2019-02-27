const fs = require('fs');
const { execSync } = require('child_process');
const glob = require('glob');

const packagesToMove = {
	'rocketchat:cors': 'rocketchat-cors',
	'rocketchat:sms': 'rocketchat-sms',
	'rocketchat:2fa': 'rocketchat-2fa',
	'rocketchat:accounts': 'rocketchat-accounts',
	'rocketchat:analytics': 'rocketchat-analytics',
	'rocketchat:api': 'rocketchat-api',
	'rocketchat:assets': 'rocketchat-assets',
	'rocketchat:authorization': 'rocketchat-authorization',
	'rocketchat:autolinker': 'rocketchat-autolinker',
	'rocketchat:autotranslate': 'rocketchat-autotranslate',
	'rocketchat:bot-helpers': 'rocketchat-bot-helpers',
	'rocketchat:cas': 'rocketchat-cas',
	'rocketchat:channel-settings': 'rocketchat-channel-settings',
	'rocketchat:channel-settings-mail-messages': 'rocketchat-channel-settings-mail-messages',
	'rocketchat:cloud': 'rocketchat-cloud',
	'rocketchat:colors': 'rocketchat-colors',
	'rocketchat:crowd': 'rocketchat-crowd',
	'rocketchat:custom-oauth': 'rocketchat-custom-oauth',
	'rocketchat:custom-sounds': 'rocketchat-custom-sounds',
	'rocketchat:dolphin': 'rocketchat-dolphin',
	'rocketchat:drupal': 'rocketchat-drupal',
	'rocketchat:emoji': 'rocketchat-emoji',
	'rocketchat:emoji-custom': 'rocketchat-emoji-custom',
	'rocketchat:emoji-emojione': 'rocketchat-emoji-emojione',
	'rocketchat:error-handler': 'rocketchat-error-handler',
	'rocketchat:favico': 'rocketchat-favico',
	'rocketchat:file': 'rocketchat-file',
	'rocketchat:file-upload': 'rocketchat-file-upload',
	'rocketchat:github-enterprise': 'rocketchat-github-enterprise',
	'rocketchat:gitlab': 'rocketchat-gitlab',
	'rocketchat:google-vision': 'rocketchat-google-vision',
	'rocketchat:grant': 'rocketchat-grant',
	'rocketchat:grant-facebook': 'rocketchat-grant-facebook',
	'rocketchat:grant-github': 'rocketchat-grant-github',
	'rocketchat:grant-google': 'rocketchat-grant-google',
	'rocketchat:graphql': 'rocketchat-graphql',
	'rocketchat:highlight-words': 'rocketchat-highlight-words',
	'rocketchat:iframe-login': 'rocketchat-iframe-login',
	'rocketchat:importer': 'rocketchat-importer',
	'rocketchat:importer-csv': 'rocketchat-importer-csv',
	'rocketchat:importer-hipchat': 'rocketchat-importer-hipchat',
	'rocketchat:importer-hipchat-enterprise': 'rocketchat-importer-hipchat-enterprise',
	'rocketchat:importer-slack': 'rocketchat-importer-slack',
	'rocketchat:importer-slack-users': 'rocketchat-importer-slack-users',
	'rocketchat:integrations': 'rocketchat-integrations',
	'rocketchat:irc': 'rocketchat-irc',
	'rocketchat:issuelinks': 'rocketchat-issuelinks',
	'rocketchat:katex': 'rocketchat-katex',
	'rocketchat:ldap': 'rocketchat-ldap',
	'rocketchat:lib': 'rocketchat-lib',
	'rocketchat:livestream': 'rocketchat-livestream',
	'rocketchat:logger': 'rocketchat-logger',
	'rocketchat:login-token': 'rocketchat-token-login',
	'rocketchat:mailer': 'rocketchat-mailer',
	'rocketchat:mapview': 'rocketchat-mapview',
	'rocketchat:markdown': 'rocketchat-markdown',
	'rocketchat:mentions': 'rocketchat-mentions',
	'rocketchat:mentions-flextab': 'rocketchat-mentions-flextab',
	'rocketchat:message-action': 'rocketchat-message-action',
	'rocketchat:message-attachments': 'rocketchat-message-attachments',
	'rocketchat:message-mark-as-unread': 'rocketchat-message-mark-as-unread',
	'rocketchat:message-pin': 'rocketchat-message-pin',
	'rocketchat:message-snippet': 'rocketchat-message-snippet',
	'rocketchat:message-star': 'rocketchat-message-star',
	'rocketchat:migrations': 'rocketchat-migrations',
	'rocketchat:oauth2-server-config': 'rocketchat-oauth2-server-config',
	'rocketchat:oembed': 'rocketchat-oembed',
	'rocketchat:otr': 'rocketchat-otr',
	'rocketchat:push-notifications': 'rocketchat-push-notifications',
	'rocketchat:retention-policy': 'rocketchat-retention-policy',
	'rocketchat:apps': 'rocketchat-apps',
	'rocketchat:sandstorm': 'rocketchat-sandstorm',
	'rocketchat:setup-wizard': 'rocketchat-setup-wizard',
	'rocketchat:slackbridge': 'rocketchat-slackbridge',
	'rocketchat:slashcommands-archive': 'rocketchat-slashcommands-archiveroom',
	'rocketchat:slashcommands-asciiarts': 'rocketchat-slashcommand-asciiarts',
	'rocketchat:slashcommands-create': 'rocketchat-slashcommands-create',
	'rocketchat:slashcommands-help': 'rocketchat-slashcommands-help',
	'rocketchat:slashcommands-hide': 'rocketchat-slashcommands-hide',
	'rocketchat:slashcommands-invite': 'rocketchat-slashcommands-invite',
	'rocketchat:slashcommands-invite-all': 'rocketchat-slashcommands-inviteall',
	'rocketchat:slashcommands-join': 'rocketchat-slashcommands-join',
	'rocketchat:slashcommands-kick': 'rocketchat-slashcommands-kick',
	'rocketchat:slashcommands-leave': 'rocketchat-slashcommands-leave',
	'rocketchat:slashcommands-me': 'rocketchat-slashcommands-me',
	'rocketchat:slashcommands-msg': 'rocketchat-slashcommands-msg',
	'rocketchat:slashcommands-mute': 'rocketchat-slashcommands-mute',
	'rocketchat:slashcommands-open': 'rocketchat-slashcommands-open',
	'rocketchat:slashcommands-topic': 'rocketchat-slashcommands-topic',
	'rocketchat:slashcommands-unarchive': 'rocketchat-slashcommands-unarchiveroom',
	'rocketchat:slider': 'rocketchat-slider',
	'rocketchat:smarsh-connector': 'rocketchat-smarsh-connector',
	'rocketchat:spotify': 'rocketchat-spotify',
	'rocketchat:statistics': 'rocketchat-statistics',
	'rocketchat:theme': 'rocketchat_theme',
	'rocketchat:tokenpass': 'rocketchat-tokenpass',
	'rocketchat:tooltip': 'rocketchat-tooltip',
	'rocketchat:ui': 'rocketchat-ui',
	'rocketchat:ui-account': 'rocketchat-ui-account',
	'rocketchat:ui-admin': 'rocketchat-ui-admin',
	'rocketchat:ui-clean-history': 'rocketchat-ui-clean-history',
	'rocketchat:ui-flextab': 'rocketchat-ui-flextab',
	'rocketchat:ui-login': 'rocketchat-ui-login',
	'rocketchat:ui-master': 'rocketchat-ui-master',
	'rocketchat:ui-message': 'rocketchat-ui-message',
	'rocketchat:ui-sidenav': 'rocketchat-ui-sidenav',
	'rocketchat:ui-vrecord': 'rocketchat-ui-vrecord',
	'rocketchat:user-data-download': 'rocketchat-user-data-download',
	'rocketchat:videobridge': 'rocketchat-videobridge',
	'rocketchat:webdav': 'rocketchat-webdav',
	'rocketchat:webrtc': 'rocketchat-webrtc',
	'rocketchat:wordpress': 'rocketchat-wordpress',
	'rocketchat:nrr': 'rocketchat-nrr',
	'steffo:meteor-accounts-saml': 'meteor-accounts-saml',
	'rocketchat:e2e': 'rocketchat-e2e',
	'rocketchat:blockstack': 'rocketchat-blockstack',
	'rocketchat:version-check': 'rocketchat-version-check',
	'rocketchat:search': 'rocketchat-search',
	'chatpal:search': 'chatpal-search',
	'rocketchat:lazy-load': 'rocketchat-lazy-load',
	'rocketchat:bigbluebutton': 'rocketchat-bigbluebutton',
	'rocketchat:mailmessages': 'rocketchat-mail-messages',
	'rocketchat:utils': 'rocketchat-utils',
	'rocketchat:settings': 'rocketchat-settings',
	'rocketchat:models': 'rocketchat-models',
	'rocketchat:metrics': 'rocketchat-metrics',
	'rocketchat:callbacks': 'rocketchat-callbacks',
	'rocketchat:notifications': 'rocketchat-notifications',
	'rocketchat:promises': 'rocketchat-promises',
	'rocketchat:ui-utils': 'rocketchat-ui-utils',
	'rocketchat:ui-cached-collection': 'rocketchat-ui-cached-collection',
	'rocketchat:action-links': 'rocketchat-action-links',
	'rocketchat:reactions': 'rocketchat-reactions',
};

function movePackagesAndRemoveFromMeteorPackageFile() {
	execSync('mkdir -p app');
	let packagesFile = fs.readFileSync('.meteor/packages').toString();

	Object.entries(packagesToMove).forEach(([name, packageName]) => {
		try {
			execSync(`mv packages/${ packageName } app/${ packageName.replace(/^rocketchat[-_]/, '') }`);
			packagesFile = packagesFile.replace(`\n${ name }`, '');
		} catch (error) {
			console.log(error.message);
		}
	});

	fs.writeFileSync('.meteor/packages', packagesFile);
}

function splitLivechatPackage() {
	execSync('mkdir -p app/livechat');
	execSync('mv packages/rocketchat-livechat/client app/livechat/');
	execSync('mv packages/rocketchat-livechat/imports app/livechat/');
	execSync('mv packages/rocketchat-livechat/lib app/livechat/');
	execSync('mv packages/rocketchat-livechat/server app/livechat/');
	execSync('cp packages/rocketchat-livechat/package.js app/livechat/package.js');

	const livechatFile = fs.readFileSync('packages/rocketchat-livechat/package.js').toString()
		.replace(/\n\t*'rocketchat:.+?',/g, '')
		.replace(/\n\t*api\.(addFiles|mainModule).+/g, '');
	fs.writeFileSync('packages/rocketchat-livechat/package.js', livechatFile);
}

function moveAssetsToPublicFolder() {
	execSync('mkdir -p public/font/');
	execSync('mv app/theme/client/vendor/fontello/font/fontello.eot public/font/fontello.eot');
	execSync('mv app/theme/client/vendor/fontello/font/fontello.svg public/font/fontello.svg');
	execSync('mv app/theme/client/vendor/fontello/font/fontello.ttf public/font/fontello.ttf');
	execSync('mv app/theme/client/vendor/fontello/font/fontello.woff public/font/fontello.woff');
	execSync('mv app/theme/client/vendor/fontello/font/fontello.woff2 public/font/fontello.woff2');

	execSync('mkdir -p public/client/vendor/fontello/font/');
	execSync('mv app/theme/client/vendor/fontello/demo.html public/client/vendor/fontello/demo.html');
	execSync('mv app/theme/client/vendor/fontello/utf8-rtl.html public/client/vendor/fontello/utf8-rtl.html');

	execSync('mkdir -p public/packages/rocketchat_videobridge/client/public/');
	execSync('mv app/videobridge/client/public/external_api.js public/packages/rocketchat_videobridge/client/public/external_api.js');

	// execSync('mkdir -p public/assets/');
	// execSync('mv packages/rocketchat-livechat/assets/demo.html public/assets/demo.html');

	execSync('mkdir -p public/public/');
	execSync('mv app/ui-master/public/icons.html public/public/icons.html');
}

function moveAssetsToPrivateFolder() {
	execSync('mkdir -p private/server/asset/');
	execSync('mv app/chatpal-search/server/asset/chatpal-enter.svg private/server/asset/chatpal-enter.svg');
	execSync('mv app/chatpal-search/server/asset/chatpal-logo-icon-darkblue.svg private/server/asset/chatpal-logo-icon-darkblue.svg');

	execSync('mkdir -p private/client/imports/general/');
	execSync('cp app/theme/client/imports/general/variables.css private/client/imports/general/variables.css');

	execSync('mkdir -p private/server/');
	execSync('mv app/theme/server/colors.less private/server/colors.less');
	execSync('mv app/ui-master/server/dynamic-css.js private/server/dynamic-css.js');

	execSync('mkdir -p private/public/');
	execSync('mv packages/rocketchat-livechat/public/head.html private/public/head.html');
	execSync('mv app/ui-master/public/icons.svg private/public/icons.svg');
}

function importMovedPackagesIntoMainFiles() {
	let importsFile = Object.values(packagesToMove)
		.filter((packageName) => {
			const file = fs.readFileSync(`app/${ packageName.replace(/^rocketchat[-_]/, '') }/index.js`).toString();
			if (file.match(/Meteor\.(isClient|isServer)/g)) {
				return file.match(/Meteor\.isClient/g);
			}
			return true;
		})
		.map((packageName) => `import '/app/${ packageName.replace(/^rocketchat[-_]/, '') }';`).join('\n');
	importsFile += '\nimport \'/app/livechat\';\n';
	fs.writeFileSync('client/importPackages.js', importsFile);

	importsFile = Object.values(packagesToMove)
		.filter((packageName) => {
			const file = fs.readFileSync(`app/${ packageName.replace(/^rocketchat[-_]/, '') }/index.js`).toString();
			if (file.match(/Meteor\.(isClient|isServer)/g)) {
				return file.match(/Meteor\.isServer/g);
			}
			return true;
		})
		.map((packageName) => `import '/app/${ packageName.replace(/^rocketchat[-_]/, '') }';`).join('\n');
	importsFile += '\nimport \'/app/livechat\';\n';
	fs.writeFileSync('server/importPackages.js', importsFile);

	const importsCss = `
import '/app/chatpal-search/client/style.css';
import '/app/theme/client/main.css';
import '/app/theme/client/vendor/photoswipe.css';
import '/app/theme/client/vendor/fontello/css/fontello.css';
import '/app/action-links/client/stylesheets/actionLinks.css';
import '/app/authorization/client/stylesheets/permissions.css';
import '/app/autotranslate/client/stylesheets/autotranslate.css';
import '/app/channel-settings/client/stylesheets/channel-settings.css';
import '/app/colors/client/style.css';
import '/app/custom-sounds/assets/stylesheets/customSoundsAdmin.css';
import '/app/dolphin/client/login-button.css';
import '/app/drupal/client/login-button.css';
import '/app/e2e/client/stylesheets/e2e.less';
import '/app/emoji-custom/assets/stylesheets/emojiCustomAdmin.css';
import '/app/emoji-emojione/client/sprites.css';
import '/app/github-enterprise/client/github-enterprise-login-button.css';
import '/app/gitlab/client/gitlab-login-button.css';
import '/app/integrations/client/stylesheets/integrations.css';
import '/app/katex/client/style.css';
import '/app/livechat/client/stylesheets/livechat.less';
import '/app/livestream/client/styles/liveStreamTab.css';
import '/app/mentions-flextab/client/views/stylesheets/mentionsFlexTab.less';
import '/app/message-action/client/stylesheets/messageAction.css';
import '/app/message-attachments/client/stylesheets/messageAttachments.css';
import '/app/message-pin/client/views/stylesheets/messagepin.css';
import '/app/message-snippet/client/page/stylesheets/snippetPage.css';
import '/app/message-star/client/views/stylesheets/messagestar.css';
import '/app/oauth2-server-config/client/oauth/stylesheets/oauth2.css';
import '/app/otr/client/stylesheets/otr.css';
import '/app/push-notifications/client/stylesheets/pushNotifications.css';
import '/app/reactions/client/stylesheets/reaction.css';
import '/app/search/client/style/style.css';
import '/app/tokenpass/client/login-button.css';
import '/app/tokenpass/client/channelSettings.css';
import '/app/tokenpass/client/styles.css';
import '/app/tooltip/client/tooltip.css';
import '/app/ui-clean-history/client/views/stylesheets/cleanHistory.css';
import '/app/ui-vrecord/client/vrecord.css';
import '/app/videobridge/client/stylesheets/video.less';
import '/app/wordpress/client/wordpress-login-button.css';
import '/app/katex/katex.min.css';
`;

	fs.writeFileSync('client/importsCss.js', importsCss);

	let mainFile = fs.readFileSync('client/main.js').toString();
	mainFile = `import './importsCss';\nimport './importPackages';\n${ mainFile }`;
	fs.writeFileSync('client/main.js', mainFile);

	mainFile = fs.readFileSync('server/main.js').toString();
	mainFile = `import './importPackages';\n${ mainFile }`;
	fs.writeFileSync('server/main.js', mainFile);
}

function createIndexForEachMovedPackage() {
	function mountIndex(file, packageName) {
		let newFile = file.match(/api\.mainModule\('.+?'(, '.+?')?\);/g);

		if (newFile) {
			newFile = newFile.map((item) => item.replace(/api\.mainModule\('(.+?)', 'client'\);/, 'if (Meteor.isClient) {\n\tmodule.exports = require(\'./$1\');\n}'));
			newFile = newFile.map((item) => item.replace(/api\.mainModule\('(.+?)', 'server'\);/, 'if (Meteor.isServer) {\n\tmodule.exports = require(\'./$1\');\n}'));
			newFile = newFile.map((item) => item.replace(/api\.mainModule\('(.+?)'\);/, 'module.exports = require(\'./$1\');'));

			if (file.match(/api\.mainModule\('.+?', '.+?'\);/g)) {
				newFile.unshift('import { Meteor } from \'meteor/meteor\';\n');
			}

			fs.writeFileSync(`app/${ packageName }/index.js`, `${ newFile.join('\n') }\n`);
		} else {
			console.log(`Package without mainModule: ${ packageName }`);
		}
	}

	const app = fs.readdirSync('app');
	app.forEach((packageName) => {
		const file = fs.readFileSync(`app/${ packageName }/package.js`).toString();

		mountIndex(file, packageName);
	});
}

function convertImportsToNewPath() {
	const files = glob.sync('@(app|imports|client|lib|server)/**/*.js');
	files.forEach((filePath) => {
		let file = fs.readFileSync(filePath).toString();

		if (file.match(/((from|import) 'meteor\/)|(await import\('meteor\/)/g)) {
			let count = 0;
			file = file.replace(/((from|import) )'meteor\/(.+)?'/g, (str, p0, p1, name) => {
				if (packagesToMove[name]) {
					count++;
					return `${ p1 } '/app/${ packagesToMove[name].replace(/^rocketchat[-_]/, '') }'`;
				}
				return str;
			});

			file = file.replace(/(await import\()'meteor\/(.+)?'/g, (str, p1, name) => {
				if (packagesToMove[name]) {
					count++;
					return `${ p1 }'/app/${ packagesToMove[name].replace(/^rocketchat[-_]/, '') }'`;
				}
				return str;
			});

			if (count > 0) {
				fs.writeFileSync(filePath, file);
			}
		}
	});
}

function removeOldPackageJSFiles() {
	const files = glob.sync('app/**/package.js');
	files.forEach((filePath) => {
		fs.unlinkSync(filePath);
	});
}

function addMissingMeteorPackages() {
	let packagesFile = fs.readFileSync('.meteor/packages').toString();

	packagesFile += `\n${ [
		'edgee:slingshot',
		'jalik:ufs-local@0.2.5',
		'accounts-base',
		'accounts-oauth',
		'autoupdate',
		'babel-compiler',
		'emojione:emojione@2.2.6',
		'google-oauth',
		'htmljs',
		'less',
		'matb33:collection-hooks',
		'meteorhacks:inject-initial',
		'oauth',
		'oauth2',
		'raix:eventemitter',
		'routepolicy',
		'sha',
		'swydo:graphql',
		'templating',
		'webapp',
		'webapp-hashing',
		'rocketchat:oauth2-server',
		'rocketchat:i18n',
	].join('\n') }`;

	fs.writeFileSync('.meteor/packages', packagesFile);
}

function fixEslintignore() {
	let file = fs.readFileSync('.eslintignore').toString();

	file = file.replace('packages/rocketchat-emoji-emojione/generateEmojiIndex.js', 'app/emoji-emojione/generateEmojiIndex.js');
	file = file.replace('packages/rocketchat-favico/favico.js', 'app/favico/favico.js');
	file = file.replace('packages/rocketchat-katex/client/katex/katex.min.js', 'app/katex/client/katex/katex.min.js');
	file = file.replace('packages/rocketchat_theme/client/minicolors/jquery.minicolors.js', 'app/theme/client/minicolors/jquery.minicolors.js');
	file = file.replace('packages/rocketchat_theme/client/vendor/', 'app/theme/client/vendor/');
	file = file.replace('packages/rocketchat-ui/client/lib/customEventPolyfill.js', 'app/ui/client/lib/customEventPolyfill.js');
	file = file.replace('packages/rocketchat-ui/client/lib/Modernizr.js', 'app/ui/client/lib/Modernizr.js');
	file = file.replace('packages/rocketchat-ui/client/lib/recorderjs/recorder.js', 'app/ui/client/lib/recorderjs/recorder.js');
	file = file.replace('packages/rocketchat-videobridge/client/public/external_api.js', 'public/packages/rocketchat_videobridge/client/public/external_api.js');
	file += 'public/pdf.worker.min.js\n';

	fs.writeFileSync('.eslintignore', file);
}

function fixStylelintignore() {
	let file = fs.readFileSync('.stylelintignore').toString();

	file = file.replace('packages/rocketchat_theme/client/vendor/fontello/css/fontello.css', 'app/theme/client/vendor/fontello/css/fontello.css');
	file += 'app/katex/katex.min.css\n';

	fs.writeFileSync('.stylelintignore', file);
}

function fixUnittests() {
	const files = glob.sync('app/**/*.mocks.js');
	files.forEach((filePath) => {
		let file = fs.readFileSync(filePath).toString();

		if (file.match(/mock\('meteor\/rocketchat:/g)) {
			let count = 0;
			file = file.replace(/mock\('(meteor\/(rocketchat:.+?))'/g, (str, p1, name) => {
				if (packagesToMove[name]) {
					count++;
					return `mock('/app/${ packagesToMove[name].replace(/^rocketchat[-_]/, '') }'`;
				}
				return str;
			});

			if (count > 0) {
				fs.writeFileSync(filePath, file);
			}
		}
	});

	let file = fs.readFileSync('package.json').toString();

	file = file.replace(/packages\/\*\*\//g, 'app/**/');

	fs.writeFileSync('package.json', file);
}

function fixKatex() {
	const postinstall = `
const { execSync } = require('child_process');

console.log('Running npm-postinstall.js');

execSync('cp node_modules/katex/dist/katex.min.css app/katex/');

execSync('mkdir -p public/fonts/');
execSync('cp node_modules/katex/dist/fonts/* public/fonts/');

execSync('cp node_modules/pdfjs-dist/build/pdf.worker.min.js public/');
`;

	fs.writeFileSync('.scripts/npm-postinstall.js', postinstall);

	let file = fs.readFileSync('app/ui-message/client/message.js').toString();

	file = file.replace('node_modules/pdfjs-dist/build/pdf.worker.js', 'pdf.worker.min.js');

	fs.writeFileSync('app/ui-message/client/message.js', file);

	file = fs.readFileSync('package.json').toString();

	file = file.replace(/"postinstall":\s"[^"]+"/, '"postinstall": "node .scripts/npm-postinstall.js"');

	fs.writeFileSync('package.json', file);

	execSync('meteor npm install --save katex@^0.9.0');
	fs.unlinkSync('app/katex/package.json');
	fs.unlinkSync('app/katex/package-lock.json');

	execSync('node .scripts/npm-postinstall.js');
}

function removeAddingLibInCi() {
	let file = fs.readFileSync('.circleci/config.yml').toString();

	file = file.replace(/\n\s+set \+e\n\s+meteor add rocketchat:lib\n\s+set \-e/g, '');
	file = file.replace('--max_old_space_size=4096', '--max_old_space_size=3072');

	fs.writeFileSync('.circleci/config.yml', file);
}

movePackagesAndRemoveFromMeteorPackageFile();
splitLivechatPackage();
moveAssetsToPublicFolder();
moveAssetsToPrivateFolder();
createIndexForEachMovedPackage();
importMovedPackagesIntoMainFiles();
convertImportsToNewPath();
addMissingMeteorPackages();
removeOldPackageJSFiles();
fixEslintignore();
fixStylelintignore();
fixUnittests();
fixKatex();
removeAddingLibInCi();
