# Cisco XAPI Github Action

This action interacts with Cisco Device endpoints to send and/or retrieve information.  
The results are (for now) printed to the console when run as a Github Action.

**Please note:** this Action is still in Pre-Release and not finalised.

## Inputs

---

### `destination-filter`

**Required:** The MAC address of the endpoint

### `token-data:`

**Required:** The token for authentication to access the service. Stored as a Repository Secret (E.G JWT_TOKEN).

### `device-command`

*Optional:* The xCommand to be sent to the device

## Example usage

---

```yaml
uses: 'DeclanRodgers/XAPI-Github-Action@0.9'
with:
    destination-filter: 'CC5A535FEA2F'
    token-data: ${{ secrets.JWT_TOKEN }}
    device-command: 'xStatus'
```

## In development

---

* Specify endpoint location as variable
* Methodology for sending to multiple devices
