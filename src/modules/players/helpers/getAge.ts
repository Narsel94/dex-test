export const getAge = (birth: string | number | Date) => {
    const dateOfBirth = new Date(birth);
    const ageDiffMs = Date.now() - dateOfBirth.getTime();
    const ageDate = new Date(ageDiffMs);
    const age = Math.abs(ageDate.getUTCFullYear() - 1970);
    return age;
};
