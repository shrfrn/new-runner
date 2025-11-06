Please do a thorough review of the code base or any specific part(s) of it specified by the user:

1. Asses the overall code design and the approach to the implementation
1. Look for any code patterns which don't match the conventions of the project or the rules for ai
1. Look for overly complicated algorithms
1. Look for fragile code, dead code, dead imports
1. Look for code which will be hard to maintain
1. Look for unnescessary tight coupling & bad seperation of concerns
1. Look for repetative code
1. Look for late instead of early returns
1. Look for naming of files/functions/variables which dosn't make sense, is mileading or goes against the project's conventions
1. Look for any obvious bugs or issues in the code.
1. Look for subtle data alignment issues (e.g. expecting snake_case but getting camelCase or expecting data to come through in an object but receiving a nested object like {data:{}})
1. Look for any over-engineering or files/functions getting too large and needing refactoring

Document your findings in docs/cr/<N>-cr-<DD-MM-YYYY>.md with <N> being the next available feature number (starting with 0001) and <DD-MM-YYYY> being a date pattern.