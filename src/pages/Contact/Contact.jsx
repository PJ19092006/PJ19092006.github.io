import React, { useState } from "react";
import {
  AiFillGithub,
  AiFillLinkedin,
  AiOutlineDownload,
  AiOutlineMail,
} from "react-icons/ai";
import { Button, Input, Textarea } from "../../components/form";
import { Page } from "../../components/Page";
import { blue, green, red, yellow } from "../../utils";
import {
  ContactForm,
  ContactWrapper,
  DownloadButton,
  IconButton,
} from "./Contact.styled";

export const Contact = () => {
  const [form, setFormState] = useState({ name: "", email: "", message: "" });
  const [sent, setSent] = useState(false);

  return (
    <Page header="Contact">
      <ContactWrapper>
        <ContactForm name="contact" id="contactform">
          <Input
            placeholder="Name"
            type="text"
            name="name"
            onChange={(e) =>
              setFormState((prev) => ({ ...prev, name: e.target.value }))
            }
            value={form.name}
          />

          <Input
            placeholder="Email"
            type="email"
            name="email"
            onChange={(e) =>
              setFormState((prev) => ({ ...prev, email: e.target.value }))
            }
            value={form.email}
          />

          <Textarea
            lines={15}
            placeholder="Hi! How are you?"
            name="message"
            onChange={(e) =>
              setFormState((prev) => ({ ...prev, message: e.target.value }))
            }
            value={form.message}
          />
        </ContactForm>

        <div className="buttons">
          <div className="socials">
            <a
              href="https://www.linkedin.com/in/parjanay-dadwal-6875a7298"
              target="_blank"
              rel="noopener noreferrer"
            >
              <IconButton bg={blue}>
                <AiFillLinkedin size={40} />
              </IconButton>
            </a>

            <a href="mailto:parudadwhal@gmail.com">
              <IconButton bg={green}>
                <AiOutlineMail size={40} />
              </IconButton>
            </a>

            <a
              href="https://github.com/PJ19092006"
              target="_blank"
              rel="noopener noreferrer"
            >
              <IconButton bg={yellow}>
                <AiFillGithub size={40} />
              </IconButton>
            </a>

            <a
              href="https://docs.google.com/document/d/1bB4ZJLxykoj8rJrM0Q_vQlpGH21MgIk8/preview"
              target="_blank"
              rel="noopener noreferrer"
            >
              <DownloadButton bg={red} tooltip="Resume">
                <AiOutlineDownload size={40} />
                <span>Resume</span>
              </DownloadButton>
            </a>
          </div>

          <Button
            disabled={
              sent ||
              form.email.length <= 0 ||
              form.name.length <= 0 ||
              form.message.length <= 0
            }
            onClick={() => {
              setSent(true);

              setFormState({ name: "", email: "", message: "" });

              // reset after 3 sec
              setTimeout(() => setSent(false), 3000);
            }}
          >
            {sent ? "Message Sent" : "Submit"}
          </Button>
        </div>
      </ContactWrapper>
    </Page>
  );
};
