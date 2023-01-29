const Interrogator = require('./interrogator');
const chalk = require('chalk');

const interrogator = new Interrogator();

async function init()
{
  displayTitle();
  let answers = await interrogator.displayMainMenu();
  console.log(answers);
}




function displayTitle()
{
  console.log('\n\n\n\n\n\n');
  console.log(chalk.whiteBright('+' + '-'.repeat(106) + '+'));
  console.log(
    `|            ` + chalk.blackBright(`_____`) + `                                                                                         |
|        ` + chalk.blackBright(`___/` + chalk.redBright(`O   O`) + `\\____`) + `       ` + chalk.yellowBright(`_______ .___  ___..______   __        ______  ____    ____ _______  _______`) + `  | 
|       ` + chalk.blackBright(`/ ` + chalk.redBright(`O        O`) + `   \\`) + `     ` + chalk.yellowBright(`|   ____||   \\/   ||   _  \\ |  |      /  __  \\ \\   \\  /   /|   ____||   ____|`) + ` |
|       ` + chalk.blackBright(`\\______________/`) + `     ` + chalk.yellowBright(`|  |__   |  \\  /  ||  |_)  ||  |     |  |  |  | \\   \\/   / |  |__   |  |__`) + `    |
|  ` + chalk.blackBright(`-===|____\\///\\\\\\/_____`) + `    ` + chalk.yellowBright(`|   __|  |  |\\/|  ||   ___/ |  |     |  |  |  |  \\_    _/  |   __|  |   __|`) + `   |
|      ` + chalk.blackBright(`\\----------------/`) + `    ` + chalk.yellowBright(`|  |____ |  |  |  ||  |     |  \`----.|  \`--'  |    |  |    |  |____ |  |____`) + `  |
|       ` + chalk.blackBright(`\\______________/  \\/`) + ` ` + chalk.yellowBright(`|_______||__|  |__|| _|     |_______| \\______/     |__|    |_______||_______|`) + ` |
|        ` + chalk.blackBright(`/\\__________/    //`) + `                                                                               |
| ` + chalk.blackBright(`>=o\\  // //\\\\   || \\\\  //`) + `    ` + chalk.yellowBright(`.___________..______      ___      ______  __  ___ _______ .______`) + `          |
|    ` + chalk.blackBright(`\\\\o/ //  \\o  ||  \\o//`) + `     ` + chalk.yellowBright(`|           ||   _  \\    /   \\    /      ||  |/  /|   ____||   _  \\`) + `         |
|        ` + chalk.blackBright(`//    || ||`) + `           ` + chalk.yellowBright(`\`---|  |----\`|  |_)  |  /  ^  \\  |  ,----'|  '  / |  |__   |  |_)  |`) + `        |
|    ` + chalk.blackBright(`/o==o     |o \\o==o`) + `            ` + chalk.yellowBright(`|  |     |      /  /  /_\\  \\ |  |     |    <  |   __|  |      /`) + `         |
|   ` + chalk.blackBright(`//         //     \\\\`) + `           ` + chalk.yellowBright(`|  |     |  |\\  \\-/  _____  \\|  \`----.|  .  \\ |  |____ |  |\\  \\----.`) + `    |
|   ` + chalk.blackBright(`/\\        //       /\\`) + `         ` + chalk.yellowBright(`| __ |    | _| \`.____/     \\__\\\\______||__|\\__\\|_______|| _| \`._____|`) + `    |
|             ` + chalk.blackBright(`/\\`) + `                                                                                           |`);
  console.log(chalk.whiteBright('+' + '-'.repeat(106) + '+'));
}

init();