import { atoms } from "../../atoms.css";

const label = atoms({
    fontWeight: 600,
    paddingRight: "1x",
});

const input = atoms({
    fontWeight: 400,
    borderRadius: "1x",
    background: "gray-100",
    padding: "1x",
});

export default {
    label,
    input,
};
