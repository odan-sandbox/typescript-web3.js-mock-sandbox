import Web3 from "web3";
import { EventData } from "web3-eth-contract";

import { Sample } from "../types/contracts/Sample";

// eslint-disable-next-line @typescript-eslint/no-var-requires
const abi = require("../build/contracts/Sample.json");

const BLOCK_NUMBER_PER_DAY = 24 * 60 * 4;

export class Faucet {
  private readonly web3: Web3;
  private readonly myToken: Sample;
  private events: EventData[] = [];

  constructor(address: string, fromAddress: string) {
    this.web3 = new Web3("http://localhost:7545");
    this.myToken = new this.web3.eth.Contract(abi, address, {
      from: fromAddress
    }) as Sample;
  }

  async loadLatestDayTransfers(): Promise<void> {
    const options = await this.getPastEventOption();
    this.events = await this.myToken.getPastEvents("Transfer", options);
  }

  isAlreadyWitdrawed(address: string): boolean {
    const toList = this.events.map(e => e.returnValues.to.toLowerCase());
    return toList.includes(address);
  }

  async getPastEventOption(): Promise<{
    fromBlock: number;
    toBlock: string;
  }> {
    let from = (await this.web3.eth.getBlockNumber()) - BLOCK_NUMBER_PER_DAY;
    if (from < 0) {
      from = 0;
    }
    return { fromBlock: from, toBlock: "latest" };
  }

  async sendToken(address: string): Promise<unknown> {
    return await this.myToken.methods.transfer(address, 100).send();
  }
}
