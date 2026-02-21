        # Live Announcer logic
        if gemini_client and tts_client:
            # Trigger if damage >= 10 OR if player is eliminated
            if log_data["amount_changed"] <= -10 or log_data["new_score"] <= 0:
                try:
                    event_context = f"A player named {log_data['player_name']} just took {abs(log_data['amount_changed'])} damage, bringing their score to {log_data['new_score']}."
                    if log_data["new_score"] <= 0:
                        event_context += " They have been eliminated!"

                    prompt = f"You are a foul and spitefull Ship AI tracking and commenting a space battle. {event_context} Write a single, short, urgent warning sentence announcing this."

                    response = gemini_client.models.generate_content(
                        model="gemini-2.5-flash",
                        contents=prompt,
                    )

                    if response.text:
                        generate_and_emit_audio(response.text)
                except Exception as e:
                    print(f"Error generating Live Announcer: {e}")

# TODO

Feature roadmap for Star Realms Point Tracker

## High Priority

- [ ] Implement undo functionality for last authority change
- [ ] Add keyboard shortcuts for common actions

## Medium Priority

- [ ] Add sound effects for authority changes and victory
- [ ] Support for 3+ player games (commander format)
- [ ] Dark/light theme toggle
- [ ] Add custom starting authority option
- [ ] Export/import game history as JSON
- [ ] Add player color customization
- [ ] Implement turn counter

## Low Priority

- [ ] PWA support for offline use
- [ ] Add card database for reference
- [ ] Implement combat calculator
- [ ] Statistics dashboard (win rates, average game length)
- [ ] Add faction symbols/themes for players
- [ ] Multi-device sync via cloud storage

## Completed

- [x] Two-player authority tracking
- [x] Space-themed UI with animations
- [x] Match score tracking
- [x] Game history log
- [x] Local storage persistence
- [x] Responsive mobile design
- [x] Table mode for head-to-head play
