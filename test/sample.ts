import { SampleInstance } from "../types/contracts";

const Sample = artifacts.require("Sample");

contract("Sample", () => {
  let sample: SampleInstance;
  beforeEach(async () => {
    sample = await Sample.deployed();
  });

  it("should be get value", async () => {
    const expected = "42";
    await sample.setValue(expected);

    const actual = await sample.getValue();
    assert.equal(expected, actual);
  });
});
