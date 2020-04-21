import { SampleInstance } from "../types/contracts/truffle";

const Sample = artifacts.require("Sample");

contract("Sample", () => {
  let sample: SampleInstance;
  beforeEach(async () => {
    sample = await Sample.deployed();
    console.log(sample);
  });

  it("ok", async () => {
    assert.equal(1 + 2, 3);
  });
});
