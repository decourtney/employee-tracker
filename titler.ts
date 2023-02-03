const chalk = require('chalk');

class Titler
{
  displayTitle(val)
  {
    let title;
    switch (val)
    {
      case 'main':
        this.#mainMenu();
        break;

    }
  }

  #mainMenu = () =>
  {
    console.log('\n\n\n\n\n\n');
    console.log(chalk.whiteBright('+' + '-'.repeat(120) + '+'));
    console.log(
      `|            ` + chalk.blackBright(`_____`) + `                                                                                                       |
|        ` + chalk.blackBright(`___/` + chalk.redBright(`O   O`) + `\\____`) + `      ` + chalk.yellowBright(`____    __    ___________  .______    __  ___ _______________  .______     ______  _______`) + `  | 
|       ` + chalk.blackBright(`/ ` + chalk.redBright(`O        O`) + `   \\`) + `     ` + chalk.yellowBright(`\\   \\  /  \\  /       __  \\ |   _  \\  |  |/  /|   ____    __  \\ |   _  \\   /      ||   ____|`) + ` |
|       ` + chalk.blackBright(`\\______________/`) + `     ` + chalk.yellowBright(` \\   \\/    \\/   /|  |  |  ||  |_)  | |  '  / |  |__  |  |  |  ||  |_)  | |  ,----'|  |__   `) + ` |
|  ` + chalk.blackBright(`-===|____\\///\\\\\\/_____`) + `    ` + chalk.yellowBright(`  \\            / |  |  |  ||      /  |    <  |   __| |  |  |  ||      /  |  |     |   __|  `) + ` |
|      ` + chalk.blackBright(`\\----------------/`) + `    ` + chalk.yellowBright(`   \\    /\\    /  |  \`--'  ||  |\\  \\--|  .  \\ |  |    |  \`--'  ||  |\\  \\--|  \`----.|  |____ `) + ` |
|       ` + chalk.blackBright(`\\______________/  \\/`) + ` ` + chalk.yellowBright(`    \\__/  \\__/    \\______/ | _| \`.______|\\__\\|__|     \\______/ |_ | \`.___________||_______|`) + ` |
|        ` + chalk.blackBright(`/\\__________/    //`) + `                                                                                             |
| ` + chalk.blackBright(`>=o\\  // //\\\\   || \\\\  //`) + `            ` + chalk.yellowBright(`.___________.______       ___      ______  __  ___ _______ .______`) + `                |
|    ` + chalk.blackBright(`\\\\o/ //  \\o  ||  \\o//`) + `             ` + chalk.yellowBright(`|               _  \\     /   \\    /      ||  |/  /|   ____||   _  \\`) + `               |
|        ` + chalk.blackBright(`//    || ||`) + `                   ` + chalk.yellowBright(`\`---|  |----|  | _) |   /  ^  \\  |  ,----'|  '  / |  |__   |  |_)  |`) + `              |
|    ` + chalk.blackBright(`/o==o     |o \\o==o`) + `                    ` + chalk.yellowBright(`|  |    |      /   /  /_\\  \\ |  |     |    <  |   __|  |      /`) + `               |
|   ` + chalk.blackBright(`//         //     \\\\`) + `                   ` + chalk.yellowBright(`|  |    |  |\\  \\--/  _____  \\|  \`----.|  .  \\ |  |____ |  |\\  \\----.`) + `          |
|   ` + chalk.blackBright(`/\\        //       /\\`) + `                  ` + chalk.yellowBright(`|__|    | _| \`._____/     \\__________||__|\\__\\|_______|| _| \`._____|`) + `          |
|             ` + chalk.blackBright(`/\\`) + `                                                                                                         |`);
    console.log(chalk.whiteBright('+' + '-'.repeat(120) + '+'));    
  }
}

module.exports = Titler;