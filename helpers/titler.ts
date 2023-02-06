const chalk = require('chalk');
const delay = 700;

class Titler
{
  async displayTitle(val)
  {
    await this.sleep()
    switch (val)
    {
      case 'main':
        this.mainTitle();
        break;
      case 'accessed':
        this.accessedTitle();
        break;
      case 'exit':
        this.exitTitle();
        break;
      default:
        console.log('MISSING TITLE');
    }
  }

  private mainTitle = () =>
  {
    console.clear();
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
    console.log('');
  }

  private accessedTitle = () =>
  {
    console.clear();
    console.log(chalk.whiteBright('+' + '-'.repeat(84) + '+'));
    console.log(`|   ` + chalk.yellowBright(`_______      ___  .___________.  ___     .______      ___       ______________`) + `   |
|  ` + chalk.yellowBright(`|       \\    /   \\ |           | /   \\    |   _  \\    /   \\     /          ____|`) + `  |
|  ` + chalk.yellowBright(`|  .--.  |  /  ^  \\\`---|  |----\`/  ^  \\   |  |_)  |  /  ^  \\   |   (---|  |__`) + `     |
|  ` + chalk.yellowBright(`|  |  |  | /  /_\\  \\   |  |    /  /_\\  \\  |   _  <  /  /_\\  \\   \\   \\  |   __|`) + `    |
|  ` + chalk.yellowBright(`|  '--'  |/  _____  \\  |  |   /  _____  \\ |  |_)  |/  _____  \\---)   | |  |____`) + `   |
|  ` + chalk.yellowBright(`|_______//__/     \\__\\ |__|  /__/     \\__\\|______//__/     \\________/  |_______|`) + `  |
|        ` + chalk.yellowBright(`___      ______   ______  _______   _______.  ______________  _______`) + `       |   
|       ` + chalk.yellowBright(`/   \\    /      | /      ||   ____| /       | /          ____||       \\`) + `      |    
|      ` + chalk.yellowBright(`/  ^  \\  |  ,----'|  ,----'|  |__   |   (----\`|   (---|  |__   |  .--.  |`) + `     |    
|     ` + chalk.yellowBright(`/  /_\\  \\ |  |     |  |     |   __|   \\   \\     \\   \\  |   __|  |  |  |  |`) + `     |    
|    ` + chalk.yellowBright(`/  _____  \\|  \`----.|  \`----.|  |____---)   |.----)   | |  |____ |  '--'  |`) + `     |    
|   ` + chalk.yellowBright(`/__/     \\__\\\\______| \\______||_____________/ |_______/  |_______||_______/`) + `      |
|                                                                                    |`);
    console.log(chalk.whiteBright('+' + '-'.repeat(84) + '+'));
  }

  private exitTitle = () =>
  {
    console.clear();
    console.log(chalk.whiteBright('+' + '-'.repeat(106) + '+'));
    console.log(`|                   ` + chalk.yellowBright(`.___  ___.     ___  ____    ____    .___________.__    __  _______`) + `                     |                
|                   ` + chalk.yellowBright(`|   \\/   |    /   \\ \\   \\  /   /    |           |  |  |  ||   ____|`) + `                    |                
|                   ` + chalk.yellowBright(`|  \\  /  |   /  ^  \\ \\   \\/   /     \`---|  |----|  |__|  ||  |__`) + `                       |
|                   ` + chalk.yellowBright(`|  |\\/|  |  / / _\\  \\ \\_    _/          |  |    |   __   ||   __|`) + `                      |                
|                   ` + chalk.yellowBright(`|  |  |  | /  _____  \\  |  |            |  |    |  |  |  ||  |____`) + `                     |                
|                   ` + chalk.yellowBright(`|__|  |__|/__/     \\__\\ |__|            |__|    |__|  |__||_______|`) + `                    |
|      ` + chalk.yellowBright(`____    __    ____ ______  .______     __  ___ _______   ______  .______      ______  _______`) + `       |
|      ` + chalk.yellowBright(`\\   \\  /  \\  /   //  __  \\ |   _  \\   |  |/  /|   ____| /  __  \\ |   _  \\    /      ||   ____|`) + `      |
|       ` + chalk.yellowBright(`\\   \\/    \\/   /|  |  |  ||  | _) |  | '   / |  |__   |  |  |  ||  |_)  |  |  ,----'|  |__`) + `         |
|        ` + chalk.yellowBright(`\\            / |  |  |  ||      /   |    <  |   __|  |  |  |  ||      /   |  |     |   __|`) + `        |
|         ` + chalk.yellowBright(`\\    /\\    /  |  \`--'  ||  |\\  \\---|  .  \\ |  |     |  \`--'  ||  |\\  \\---|  \`----.|  |____`) + `       |
|          ` + chalk.yellowBright(`\\__/  \\__/    \\______/ | _| \`._______|\\__\\|__|      \\______/ | _| \`.____________||_______|`) + `      |
|  ` + chalk.yellowBright(`.______   _______    ____    __    ____  __ .___________.__    __    ____    ____  ______    __    __`) + `   |
|  ` + chalk.yellowBright(`|   _  \\ |   ____|   \\   \\  /  \\  /   / |  ||           |  |  |  |   \\   \\  /   / /  __  \\  |  |  |  |`) + `  |
|  ` + chalk.yellowBright(`|  |_)  ||  |__       \\   \\/    \\/   /  |  | \`---|  |---|  |__|  |    \\   \\/   / |  |  |  | |  |  |  |`) + `  | 
|  ` + chalk.yellowBright(`|   _  < |   __|       \\            /   |  |     |  |   |   __   |     \\_    _/  |  |  |  | |  |  |  |`) + `  | 
|  ` + chalk.yellowBright(`|  |_)  ||  |____       \\    /\\    /    |  |     |  |   |  |  |  |       |  |    |  \`--'  | |  \`--'  |`) + `  | 
|  ` + chalk.yellowBright(`|______/ |_______|       \\__/  \\__/     |__|     |__|   |__|  |__|       |__|     \\______/   \\______/`) + `   | 
|                                                                                                          |`);
    console.log(chalk.whiteBright('+' + '-'.repeat(106) + '+'));
  }

  private sleep()
{
  console.log(chalk.yellowBright('\nProcessing. Please Wait...'));
  return new Promise(resolve => setTimeout(resolve, delay));
}

}

module.exports = Titler;