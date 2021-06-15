import shrinkText from './shrinkText';

const sampleText = "I like to eat bananas, apples, and grapes with my breakfast because I like fruit.";

test('text with no options should not change', () => {
    expect(shrinkText(sampleText, [])).toBe(sampleText);
})

test('text should use abbreviations', () => {
    expect(shrinkText(sampleText, ['ampersand', 'with', 'because'])).toBe("I like to eat bananas, apples, & grapes w/ my breakfast b/c I like fruit.");
})

test('text can eliminate Oxford comma', () => {
    expect(shrinkText(sampleText, ['oxford'])).toBe("I like to eat bananas, apples and grapes with my breakfast because I like fruit.");
})

test('ampersand and Oxford elimination do not interfere', () => {
    expect(shrinkText(sampleText, ['oxford', 'ampersand'])).toBe("I like to eat bananas, apples & grapes with my breakfast because I like fruit.");
    expect(shrinkText(sampleText, ['ampersand', 'oxford'])).toBe("I like to eat bananas, apples & grapes with my breakfast because I like fruit.");
})
