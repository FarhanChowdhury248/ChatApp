import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@material-ui/core";

export const LandingPageDialog = ({ isOpen, onClose }) => (
  <Dialog open={isOpen} onClose={onClose}>
    <DialogTitle>
      <p
        style={{
          margin: 0,
          fontSize: "3rem",
          fontFamily: "Lato",
          color: "#615f5f",
        }}
      >
        Invalid room code
      </p>
    </DialogTitle>
    <DialogContent>
      <DialogContentText>
        <p style={{ margin: 0, paddingRight: "10rem", fontSize: "2rem" }}>
          We couldn't find a room with that code :(
        </p>
      </DialogContentText>
    </DialogContent>
    <DialogActions>
      <Button
        onClick={onClose}
        autoFocus
        color="tertiary"
        style={{
          fontSize: "1.5rem",
          padding: "0.5rem 2rem",
          width: "10rem",
          borderRadius: "1.5rem",
          fontFamily: "Lato",
          fontWeight: "normal",
          textTransform: "none",
          letterSpacing: "0.1rem",
        }}
      >
        Close
      </Button>
    </DialogActions>
  </Dialog>
);
