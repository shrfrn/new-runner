We just implemented the feature described in the attached plan and implementation summary docs.

Please do a thorough code review:
1. Make sure that the plan was correctly implemented.
2. Look for any obvious bugs or issues in the code.
3. Look for subtle data alignment issues (e.g. expecting snake_case but getting camelCase or expecting data to come through in an object but receiving a nested object like {data:{}})
4. Look for any over-engineering or files/functions getting too large and needing refactoring
5. Look for any weird syntax or style that doesn't match other parts of the codebase

Document your findings in docs/features/<N>-feature-cr-<M>.md with <N> & <M> being the numbers used in the implementation document name (<N>-implementation-<M>.md).