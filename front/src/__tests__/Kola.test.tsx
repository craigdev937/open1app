import { expect, test } from "@rstest/core";
import { hiKola } from "../components/Kola";

test("should hiKola correctly", () => {
    expect(hiKola()).toBe("Kola Franklin");
});



